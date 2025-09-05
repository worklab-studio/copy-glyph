// Enhanced Web Worker for advanced icon search functionality
import { type IconItem } from '@/types/icon';
import { 
  fuzzyScore, 
  multiWordScore, 
  extractWords, 
  stem, 
  phoneticallyMatch 
} from '../lib/search-algorithms';
import { expandQueryWithSynonyms } from '../lib/search-synonyms';

interface SearchMessage {
  type: 'search' | 'index' | 'clear';
  query?: string;
  libraryId?: string;
  icons?: SearchableIcon[];
  options?: {
    fuzzy?: boolean;
    maxResults?: number;
    minScore?: number;
    enableSynonyms?: boolean;
    enablePhonetic?: boolean;
    exactMatch?: boolean;
    libraryId?: string;
  };
}

// Simplified icon interface for search indexing (no SVG components)
interface SearchableIcon {
  id: string;
  name: string;
  tags?: string[];
  category?: string;
  style?: string;
}

interface SearchResult {
  icon: SearchableIcon;
  score: number;
  matchedFields: string[];
  matchType: 'exact' | 'fuzzy' | 'phonetic' | 'synonym';
  matchDetail: string;
}

interface SearchOptions {
  fuzzy?: boolean;
  maxResults?: number;
  minScore?: number;
  enableSynonyms?: boolean;
  enablePhonetic?: boolean;
  exactMatch?: boolean;
  libraryId?: string;
}

// Enhanced search index with performance optimizations
const searchIndex = new Map<string, {
  icons: Map<string, SearchableIcon>;
  nameIndex: Map<string, Set<string>>;
  tagIndex: Map<string, Set<string>>;
  categoryIndex: Map<string, Set<string>>;
  stemIndex: Map<string, Set<string>>;
}>();

// Search result cache with LRU eviction
const searchCache = new Map<string, { results: { results: SearchableIcon[]; totalCount: number }; timestamp: number }>();
const MAX_CACHE_SIZE = 200;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Scoring weights for different match types
const FIELD_WEIGHTS = {
  exactNameMatch: 100.0,
  exactTagMatch: 80.0,
  exactCategoryMatch: 60.0,
  fuzzyNameMatch: 40.0,
  fuzzyTagMatch: 30.0,
  fuzzyCategoryMatch: 20.0,
  synonymNameMatch: 35.0,
  synonymTagMatch: 25.0,
  synonymCategoryMatch: 15.0,
  partialTagMatch: 20.0,
  phoneticNameMatch: 10.0,
  phoneticTagMatch: 8.0,
};

// Helper function to escape regex special characters
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Enhanced candidate collection with exact match support
function collectCandidates(query: string, options: SearchOptions): Set<string> {
  const { exactMatch } = options;
  const candidates = new Set<string>();
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return candidates;
  
  console.log(`[Search Debug] Collecting candidates for "${normalizedQuery}", exactMatch: ${exactMatch}`);

  for (const [libraryId, library] of searchIndex.entries()) {
    // Skip if filtering by library and this isn't the target library
    if (options.libraryId && libraryId !== options.libraryId) continue;

    const initialCandidateCount = candidates.size;

    if (exactMatch) {
      // STRICT EXACT MATCHING ONLY
      
      // 1. Exact name matches only
      if (library.nameIndex.has(normalizedQuery)) {
        const nameMatches = library.nameIndex.get(normalizedQuery)!;
        nameMatches.forEach(id => candidates.add(id));
        console.log(`[Search Debug] Found ${nameMatches.size} exact name matches in ${libraryId}`);
      }
      
      // 2. Exact tag matches only
      if (library.tagIndex.has(normalizedQuery)) {
        const tagMatches = library.tagIndex.get(normalizedQuery)!;
        tagMatches.forEach(id => candidates.add(id));
        console.log(`[Search Debug] Found ${tagMatches.size} exact tag matches in ${libraryId}`);
      }
      
      // 3. Exact category matches only
      if (library.categoryIndex.has(normalizedQuery)) {
        const categoryMatches = library.categoryIndex.get(normalizedQuery)!;
        categoryMatches.forEach(id => candidates.add(id));
        console.log(`[Search Debug] Found ${categoryMatches.size} exact category matches in ${libraryId}`);
      }
      
    } else {
      // NON-EXACT: Use original substring matching
      
      // Name index with substring matching
      for (const [indexedName, iconIds] of library.nameIndex.entries()) {
        if (indexedName.includes(normalizedQuery)) {
          iconIds.forEach(id => candidates.add(id));
        }
      }
      
      // Tag index with substring matching
      for (const [tag, iconIds] of library.tagIndex.entries()) {
        if (tag.includes(normalizedQuery)) {
          iconIds.forEach(id => candidates.add(id));
        }
      }
      
      // Category index with substring matching
      for (const [category, iconIds] of library.categoryIndex.entries()) {
        if (category.includes(normalizedQuery)) {
          iconIds.forEach(id => candidates.add(id));
        }
      }
      
      // Stem index for fuzzy matching
      const queryStem = stem(normalizedQuery);
      if (library.stemIndex.has(queryStem)) {
        library.stemIndex.get(queryStem)!.forEach(id => candidates.add(id));
      }
    }

    const libraryMatches = candidates.size - initialCandidateCount;
    console.log(`[Search Debug] Library ${libraryId} contributed ${libraryMatches} candidates`);
  }

  console.log(`[Search Debug] Total candidates collected: ${candidates.size}`);
  return candidates;
}

function calculateIconScore(
  icon: SearchableIcon,
  originalQuery: string,
  expandedQueries: string[],
  queryWords: string[],
  options: SearchOptions = {}
): SearchResult | null {
  const { fuzzy = true, enableSynonyms = true, enablePhonetic = true, exactMatch = false } = options;
  
  let totalScore = 0;
  const matchedFields: string[] = [];
  let matchType: 'exact' | 'fuzzy' | 'phonetic' | 'synonym' = 'exact';
  let matchDetail = '';

  // Normalize data for comparison
  const normalizedName = icon.name.toLowerCase().trim();
  const normalizedTags = (icon.tags || []).map(tag => tag.toLowerCase().trim());
  const normalizedCategory = (icon.category || '').toLowerCase().trim();
  const normalizedQuery = originalQuery.toLowerCase().trim();

  console.log(`[Search Debug] Scoring icon "${icon.name}" (ID: ${icon.id}) against "${normalizedQuery}"`);

  // STRICT EXACT MATCH MODE
  if (exactMatch) {
    console.log(`[Search Debug] Using exact match mode for "${icon.name}"`);
    
    // 1. Exact name match
    if (normalizedName === normalizedQuery) {
      totalScore += FIELD_WEIGHTS.exactNameMatch;
      matchedFields.push('name');
      matchDetail = `Exact name match: "${normalizedName}"`;
      console.log(`[Search Debug] ✓ Exact name match found for "${icon.name}"`);
    }

    // 2. Exact tag matches
    for (const tag of normalizedTags) {
      if (tag === normalizedQuery) {
        totalScore += FIELD_WEIGHTS.exactTagMatch;
        matchedFields.push('tags');
        matchDetail += (matchDetail ? ' + ' : '') + `Exact tag match: "${tag}"`;
        console.log(`[Search Debug] ✓ Exact tag match found: "${tag}" for "${icon.name}"`);
      }
    }

    // 3. Exact category match
    if (normalizedCategory === normalizedQuery) {
      totalScore += FIELD_WEIGHTS.exactCategoryMatch;
      matchedFields.push('category');
      matchDetail += (matchDetail ? ' + ' : '') + `Exact category match: "${normalizedCategory}"`;
      console.log(`[Search Debug] ✓ Exact category match found for "${icon.name}"`);
    }

    // NO fuzzy, phonetic, or synonym matching in exact mode
    if (totalScore === 0) {
      console.log(`[Search Debug] ✗ No exact matches found for "${icon.name}"`);
      return null;
    }
    
  } else {
    // ORIGINAL NON-EXACT MATCHING LOGIC
    const allQueries = enableSynonyms ? expandedQueries : [originalQuery];

    for (const query of allQueries) {
      const queryType = query === originalQuery ? 'exact' : 'synonym';
      const currentWords = extractWords(query);

      // Name matching
      if (normalizedName.includes(query.toLowerCase())) {
        const weight = query === originalQuery ? FIELD_WEIGHTS.exactNameMatch : FIELD_WEIGHTS.synonymNameMatch;
        totalScore += weight;
        matchedFields.push('name');
        if (queryType === 'synonym') matchType = 'synonym';
      } else if (fuzzy) {
        const nameScore = fuzzyScore(query, normalizedName);
        if (nameScore > 0) {
          totalScore += nameScore * FIELD_WEIGHTS.fuzzyNameMatch;
          matchedFields.push('name');
          matchType = 'fuzzy';
        }
      }

      // Tag matching
      for (const tag of normalizedTags) {
        if (tag === query.toLowerCase()) {
          const weight = queryType === 'exact' ? FIELD_WEIGHTS.exactTagMatch : FIELD_WEIGHTS.synonymTagMatch;
          totalScore += weight;
          matchedFields.push('tags');
          if (queryType === 'synonym') matchType = 'synonym';
        } else if (tag.includes(query.toLowerCase())) {
          const weight = queryType === 'exact' ? FIELD_WEIGHTS.partialTagMatch : FIELD_WEIGHTS.synonymTagMatch * 0.8;
          totalScore += weight;
          matchedFields.push('tags');
          if (queryType === 'synonym') matchType = 'synonym';
        } else if (fuzzy) {
          const tagScore = fuzzyScore(query, tag);
          if (tagScore > 0) {
            totalScore += tagScore * FIELD_WEIGHTS.fuzzyTagMatch;
            matchedFields.push('tags');
            matchType = 'fuzzy';
          }
        }
      }

      // Category matching
      if (normalizedCategory.includes(query.toLowerCase())) {
        const weight = queryType === 'exact' ? FIELD_WEIGHTS.exactCategoryMatch : FIELD_WEIGHTS.synonymCategoryMatch;
        totalScore += weight;
        matchedFields.push('category');
        if (queryType === 'synonym') matchType = 'synonym';
      }

      // Multi-word matching for compound queries
      if (currentWords.length > 1) {
        const multiScore = multiWordScore(currentWords, `${normalizedName} ${normalizedTags.join(' ')} ${normalizedCategory}`, 0.6);
        if (multiScore > 0) {
          totalScore += multiScore;
          matchedFields.push('multiword');
          if (queryType === 'synonym') matchType = 'synonym';
        }
      }
    }

    // Phonetic matching (only for non-exact mode)
    if (enablePhonetic && fuzzy && totalScore === 0) {
      if (phoneticallyMatch(normalizedQuery, normalizedName)) {
        totalScore += FIELD_WEIGHTS.phoneticNameMatch;
        matchedFields.push('name');
        matchType = 'phonetic';
      }

      for (const tag of normalizedTags) {
        if (phoneticallyMatch(normalizedQuery, tag)) {
          totalScore += FIELD_WEIGHTS.phoneticTagMatch;
          matchedFields.push('tags');
          matchType = 'phonetic';
        }
      }
    }
  }

  if (totalScore === 0) return null;

  const result = {
    icon,
    score: totalScore,
    matchedFields: [...new Set(matchedFields)],
    matchType,
    matchDetail: matchDetail || `${matchType} match`
  };

  console.log(`[Search Debug] Final score for "${icon.name}": ${totalScore} (${result.matchDetail})`);
  return result;
}

function searchIcons(query: string, options: SearchOptions = {}): { results: SearchableIcon[]; totalCount: number } {
  const startTime = performance.now();
  const { maxResults = 50, fuzzy = true, enableSynonyms = true, enablePhonetic = true, exactMatch = false } = options;
  
  // Preprocess and validate query
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) {
    console.log(`[Search Debug] Empty query provided`);
    return { results: [], totalCount: 0 };
  }

  console.log(`[Search Debug] Starting search for "${normalizedQuery}" with options:`, {
    maxResults,
    fuzzy: fuzzy && !exactMatch, // Disable fuzzy when exact match is enabled
    enableSynonyms: enableSynonyms && !exactMatch, // Disable synonyms when exact match is enabled
    enablePhonetic: enablePhonetic && !exactMatch, // Disable phonetic when exact match is enabled
    exactMatch
  });
  
  const cacheKey = JSON.stringify({ query: normalizedQuery, options });
  
  // Check cache first
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log(`[Search Debug] Returning cached result for "${normalizedQuery}"`);
    return cached.results;
  }

  // For exact match, disable expansions
  const expandedQueries = (enableSynonyms && !exactMatch) ? expandQueryWithSynonyms(normalizedQuery) : [normalizedQuery];
  const queryWords = extractWords(normalizedQuery);

  console.log(`[Search Debug] Query expansion:`, expandedQueries);

  // Collect candidates
  const candidates = collectCandidates(normalizedQuery, options);
  
  if (candidates.size === 0) {
    console.log(`[Search Debug] No candidates found for "${normalizedQuery}"`);
    const emptyResult = { results: [], totalCount: 0 };
    searchCache.set(cacheKey, { results: emptyResult, timestamp: Date.now() });
    return emptyResult;
  }

  console.log(`[Search Debug] Found ${candidates.size} candidates, scoring them...`);

  // Score candidates
  const scoredResults: SearchResult[] = [];
  for (const candidateId of candidates) {
    for (const [libraryId, library] of searchIndex.entries()) {
      if (options.libraryId && libraryId !== options.libraryId) continue;
      
      const icon = library.icons.get(candidateId);
      if (!icon) continue;

      // For exact match mode, pass modified options to disable fuzzy features
      const scoringOptions = exactMatch ? {
        ...options,
        fuzzy: false,
        enableSynonyms: false,
        enablePhonetic: false,
        exactMatch: true
      } : options;

      const result = calculateIconScore(icon, normalizedQuery, expandedQueries, queryWords, scoringOptions);
      if (result && result.score > 0) {
        scoredResults.push(result);
      }
    }
  }

  console.log(`[Search Debug] Scored ${scoredResults.length} icons with non-zero scores`);

  // Sort by score (descending) and then by name for consistency
  scoredResults.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.icon.name.localeCompare(b.icon.name);
  });

  // Log top results for debugging
  console.log(`[Search Debug] Top 5 results:`, scoredResults.slice(0, 5).map(r => ({
    name: r.icon.name,
    score: r.score,
    matchDetail: r.matchDetail
  })));

  // Extract icons and limit results
  const results = scoredResults.slice(0, maxResults).map(result => result.icon);
  const totalCount = scoredResults.length;
  
  const finalResult = { results, totalCount };
  
  // Cache the result
  searchCache.set(cacheKey, { results: finalResult, timestamp: Date.now() });
  
  // Clean cache periodically
  if (Math.random() < 0.1) {
    cleanCache();
  }
  
  const endTime = performance.now();
  console.log(`[Search Debug] Search completed in ${(endTime - startTime).toFixed(2)}ms. Returned ${results.length} results out of ${totalCount} total matches.`);
  
  return finalResult;
}

// Build enhanced search index with exact matching support
function buildIndex(libraryId: string, icons: SearchableIcon[]) {
  const iconsMap = new Map<string, SearchableIcon>();
  const nameIndex = new Map<string, Set<string>>();
  const tagIndex = new Map<string, Set<string>>();
  const categoryIndex = new Map<string, Set<string>>();
  const stemIndex = new Map<string, Set<string>>();
  
  for (const icon of icons) {
    // Store the icon
    iconsMap.set(icon.id, icon);
    
    // Ensure consistent field normalization
    const normalizedName = (icon.name || '').toLowerCase().trim();
    const normalizedTags = (icon.tags || []).map(tag => tag.toLowerCase().trim());
    const normalizedCategory = (icon.category || '').toLowerCase().trim();
    
    // Index full name for exact matching
    if (normalizedName) {
      if (!nameIndex.has(normalizedName)) nameIndex.set(normalizedName, new Set());
      nameIndex.get(normalizedName)!.add(icon.id);
    }
    
    // Index name words for partial matching
    const nameWords = extractWords(normalizedName);
    for (const word of nameWords) {
      if (!nameIndex.has(word)) nameIndex.set(word, new Set());
      nameIndex.get(word)!.add(icon.id);
      
      // Add stemmed version
      const stemmed = stem(word);
      if (stemmed !== word) {
        if (!stemIndex.has(stemmed)) stemIndex.set(stemmed, new Set());
        stemIndex.get(stemmed)!.add(icon.id);
      }
    }
    
    // Index tags (both full tags and tag words)
    for (const tag of normalizedTags) {
      if (tag) {
        // Index full tag for exact matching
        if (!tagIndex.has(tag)) tagIndex.set(tag, new Set());
        tagIndex.get(tag)!.add(icon.id);
        
        // Index tag words for partial matching
        const tagWords = extractWords(tag);
        for (const word of tagWords) {
          if (!tagIndex.has(word)) tagIndex.set(word, new Set());
          tagIndex.get(word)!.add(icon.id);
          
          // Add stemmed version
          const stemmed = stem(word);
          if (stemmed !== word) {
            if (!stemIndex.has(stemmed)) stemIndex.set(stemmed, new Set());
            stemIndex.get(stemmed)!.add(icon.id);
          }
        }
      }
    }
    
    // Index category
    if (normalizedCategory) {
      // Index full category for exact matching
      if (!categoryIndex.has(normalizedCategory)) categoryIndex.set(normalizedCategory, new Set());
      categoryIndex.get(normalizedCategory)!.add(icon.id);
      
      // Index category words for partial matching
      const categoryWords = extractWords(normalizedCategory);
      for (const word of categoryWords) {
        if (!categoryIndex.has(word)) categoryIndex.set(word, new Set());
        categoryIndex.get(word)!.add(icon.id);
        
        // Add stemmed version
        const stemmed = stem(word);
        if (stemmed !== word) {
          if (!stemIndex.has(stemmed)) stemIndex.set(stemmed, new Set());
          stemIndex.get(stemmed)!.add(icon.id);
        }
      }
    }
  }
  
  searchIndex.set(libraryId, {
    icons: iconsMap,
    nameIndex,
    tagIndex,
    categoryIndex,
    stemIndex
  });
  
  console.log(`[Search Debug] Indexed ${icons.length} icons for library ${libraryId}`);
}

// Clear expired cache entries
function cleanCache() {
  const now = Date.now();
  for (const [key, entry] of searchCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      searchCache.delete(key);
    }
  }
  
  // Enforce cache size limit
  if (searchCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(searchCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toDelete = entries.slice(0, entries.length - MAX_CACHE_SIZE);
    for (const [key] of toDelete) {
      searchCache.delete(key);
    }
  }
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
        } else {
          self.postMessage({ 
            type: 'indexComplete', 
            libraryId, 
            success: false, 
            error: 'Missing libraryId or icons' 
          });
        }
        break;
        
      case 'search':
        if (query !== undefined) {
          const results = searchIcons(query, options);
          self.postMessage({ 
            type: 'searchResults', 
            query: query,
            results: results.results,
            totalCount: results.totalCount,
            success: true 
          });
        } else {
          self.postMessage({ 
            type: 'searchResults', 
            query: query || '',
            results: [], 
            totalCount: 0,
            success: false, 
            error: 'Missing query' 
          });
        }
        break;
        
      case 'clear':
        if (libraryId) {
          searchIndex.delete(libraryId);
        } else {
          searchIndex.clear();
        }
        searchCache.clear();
        self.postMessage({ 
          type: 'clearComplete', 
          success: true 
        });
        break;
        
      default:
        self.postMessage({ 
          type: 'error', 
          error: `Unknown message type: ${type}` 
        });
    }
  } catch (error) {
    console.error('Search worker error:', error);
    self.postMessage({ 
      type: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export {};