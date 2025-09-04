// Web Worker for search functionality to prevent UI blocking
import { type IconItem } from '@/types/icon';

interface SearchMessage {
  type: 'search' | 'index' | 'clear';
  query?: string;
  icons?: IconItem[];
  libraryId?: string;
  options?: {
    fuzzy?: boolean;
    maxResults?: number;
    minScore?: number;
  };
}

interface SearchResult {
  icon: IconItem;
  score: number;
  matchedFields: string[];
}

// Search index stored in worker memory
const searchIndex = new Map<string, {
  icons: IconItem[];
  nameIndex: Map<string, IconItem[]>;
  tagIndex: Map<string, IconItem[]>;
  categoryIndex: Map<string, IconItem[]>;
}>();

// Simple fuzzy matching score
function fuzzyMatch(query: string, target: string): number {
  query = query.toLowerCase();
  target = target.toLowerCase();
  
  if (target.includes(query)) {
    // Exact substring match gets high score
    const position = target.indexOf(query);
    return 1 - (position / target.length) * 0.1; // Earlier matches score higher
  }
  
  // Character-by-character fuzzy matching
  let score = 0;
  let queryIndex = 0;
  
  for (let i = 0; i < target.length && queryIndex < query.length; i++) {
    if (target[i] === query[queryIndex]) {
      score += 1;
      queryIndex++;
    }
  }
  
  return queryIndex === query.length ? score / query.length * 0.8 : 0;
}

// Build search index for a library
function buildIndex(libraryId: string, icons: IconItem[]) {
  const nameIndex = new Map<string, IconItem[]>();
  const tagIndex = new Map<string, IconItem[]>();
  const categoryIndex = new Map<string, IconItem[]>();
  
  for (const icon of icons) {
    // Index by name words
    const nameWords = icon.name.toLowerCase().split(/\s+/);
    for (const word of nameWords) {
      if (!nameIndex.has(word)) nameIndex.set(word, []);
      nameIndex.get(word)!.push(icon);
    }
    
    // Index by tags
    if (icon.tags) {
      for (const tag of icon.tags) {
        const tagKey = tag.toLowerCase();
        if (!tagIndex.has(tagKey)) tagIndex.set(tagKey, []);
        tagIndex.get(tagKey)!.push(icon);
      }
    }
    
    // Index by category
    if (icon.category) {
      const categoryKey = icon.category.toLowerCase();
      if (!categoryIndex.has(categoryKey)) categoryIndex.set(categoryKey, []);
      categoryIndex.get(categoryKey)!.push(icon);
    }
  }
  
  searchIndex.set(libraryId, {
    icons,
    nameIndex,
    tagIndex,
    categoryIndex
  });
}

// Search function
function searchIcons(query: string, options: SearchMessage['options'] = {}): SearchResult[] {
  const {
    fuzzy = true,
    maxResults = 1000,
    minScore = 0.3
  } = options;
  
  const results: SearchResult[] = [];
  const seen = new Set<string>();
  
  query = query.toLowerCase().trim();
  if (!query) return [];
  
  // Search across all indexed libraries
  for (const [libraryId, index] of searchIndex) {
    // Direct matches from indexes
    const candidates = new Set<IconItem>();
    
    // Search name index
    for (const [key, icons] of index.nameIndex) {
      if (key.includes(query)) {
        icons.forEach(icon => candidates.add(icon));
      }
    }
    
    // Search tag index
    for (const [key, icons] of index.tagIndex) {
      if (key.includes(query)) {
        icons.forEach(icon => candidates.add(icon));
      }
    }
    
    // Search category index
    for (const [key, icons] of index.categoryIndex) {
      if (key.includes(query)) {
        icons.forEach(icon => candidates.add(icon));
      }
    }
    
    // Score and filter candidates
    for (const icon of candidates) {
      if (seen.has(icon.id)) continue;
      seen.add(icon.id);
      
      const scores: { field: string; score: number }[] = [];
      
      // Score against name
      const nameScore = fuzzy ? 
        fuzzyMatch(query, icon.name) : 
        (icon.name.toLowerCase().includes(query) ? 1 : 0);
      if (nameScore > 0) {
        scores.push({ field: 'name', score: nameScore * 1.0 }); // Name matches weighted highest
      }
      
      // Score against tags
      if (icon.tags) {
        for (const tag of icon.tags) {
          const tagScore = fuzzy ? 
            fuzzyMatch(query, tag) : 
            (tag.toLowerCase().includes(query) ? 1 : 0);
          if (tagScore > 0) {
            scores.push({ field: 'tag', score: tagScore * 0.8 });
          }
        }
      }
      
      // Score against category
      if (icon.category) {
        const categoryScore = fuzzy ? 
          fuzzyMatch(query, icon.category) : 
          (icon.category.toLowerCase().includes(query) ? 1 : 0);
        if (categoryScore > 0) {
          scores.push({ field: 'category', score: categoryScore * 0.6 });
        }
      }
      
      // Calculate final score (max of all field scores)
      const maxScore = Math.max(...scores.map(s => s.score), 0);
      
      if (maxScore >= minScore) {
        results.push({
          icon,
          score: maxScore,
          matchedFields: scores.map(s => s.field)
        });
      }
    }
  }
  
  // Sort by score (descending) and limit results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// Handle messages from main thread
self.onmessage = function(event: MessageEvent<SearchMessage>) {
  const { type, query, icons, libraryId, options } = event.data;
  
  try {
    switch (type) {
      case 'index':
        if (libraryId && icons) {
          buildIndex(libraryId, icons);
          self.postMessage({ 
            type: 'indexComplete', 
            libraryId,
            success: true 
          });
        }
        break;
        
      case 'search':
        if (query !== undefined) {
          const results = searchIcons(query, options);
          self.postMessage({ 
            type: 'searchResults', 
            results: results.map(r => r.icon), // Only send icons, not full results
            query,
            count: results.length
          });
        }
        break;
        
      case 'clear':
        if (libraryId) {
          searchIndex.delete(libraryId);
        } else {
          searchIndex.clear();
        }
        self.postMessage({ 
          type: 'clearComplete',
          libraryId: libraryId || 'all'
        });
        break;
        
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Handle worker errors
self.onerror = function(error: ErrorEvent) {
  self.postMessage({
    type: 'error',
    error: error.message || 'Worker error'
  });
};

export {}; // Make this a module