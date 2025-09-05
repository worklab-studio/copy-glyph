// Fallback search implementation using the same advanced algorithms as the worker
import { type IconItem } from '@/types/icon';
import { 
  fuzzyScore, 
  multiWordScore, 
  extractWords, 
  stem, 
  phoneticallyMatch 
} from './search-algorithms';
import { expandQueryWithSynonyms } from './search-synonyms';

interface FallbackSearchOptions {
  fuzzy?: boolean;
  maxResults?: number;
  minScore?: number;
  enableSynonyms?: boolean;
  enablePhonetic?: boolean;
  exactMatch?: boolean;
  libraryId?: string;
}

interface SearchResult {
  icon: IconItem;
  score: number;
  matchedFields: string[];
  matchDetails: {
    exactMatch: boolean;
    fuzzyMatch: boolean;
    synonymMatch: boolean;
    phoneticMatch: boolean;
  };
}

// Tiered scoring system for precise search results
const FIELD_WEIGHTS = {
  nameExact: 200.0,     // Perfect name match gets highest score - boosted
  namePrefix: 80.0,     // Name starts with query - boosted  
  nameFuzzy: 15.0,      // Fuzzy name match - slightly increased
  tagExact: 60.0,       // Exact tag match - boosted
  tagFuzzy: 5.0,        // Fuzzy tag match - reduced for precision
  categoryExact: 30.0,  // Exact category match - boosted
  categoryFuzzy: 3.0,   // Fuzzy category match - reduced
  synonymMatch: 4.0,    // Synonym match - reduced
  phoneticMatch: 2.0,   // Phonetic match - reduced  
  stemMatch: 6.0        // Stemmed word match - reduced
};

// Calculate comprehensive search score for an icon (same logic as worker)
function calculateIconScore(
  icon: IconItem, 
  originalQuery: string,
  expandedQueries: string[],
  queryWords: string[],
  options: FallbackSearchOptions = {}
): SearchResult | null {
  const { fuzzy = true, enableSynonyms = false, enablePhonetic = true, exactMatch = false } = options;
  
  let bestScore = 0;
  let matchedFields: string[] = [];
  let matchDetails = {
    exactMatch: false,
    fuzzyMatch: false,
    synonymMatch: false,
    phoneticMatch: false
  };

  // Normalize icon fields once - CRITICAL: Fix tag normalization bug
  const iconName = (icon.name || '').toLowerCase();
  const iconTags = (icon.tags || []).map(tag => tag.toLowerCase()); // FIXED: Ensure all tags are lowercase
  const iconCategory = (icon.category || '').toLowerCase();
  
  // Check all expanded queries (including synonyms)
  for (const query of expandedQueries) {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) continue;
    
    let queryScore = 0;
    const currentFields: string[] = [];
    
    // Score against name
    if (exactMatch) {
      // Exact matching: check for exact word matches using word boundaries
      const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (iconName === normalizedQuery) {
        queryScore = Math.max(queryScore, FIELD_WEIGHTS.nameExact);
        matchDetails.exactMatch = true;
        currentFields.push('name');
      } else if (wordBoundaryRegex.test(iconName)) {
        queryScore = Math.max(queryScore, FIELD_WEIGHTS.nameExact * 0.9);
        matchDetails.exactMatch = true;
        currentFields.push('name');
      }
    } else {
      // Original substring matching logic
      if (iconName.includes(normalizedQuery)) {
        if (iconName === normalizedQuery) {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.nameExact);
          matchDetails.exactMatch = true;
        } else if (iconName.startsWith(normalizedQuery)) {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.namePrefix);
        } else {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.nameExact * 0.8);
        }
        currentFields.push('name');
      } else if (fuzzy) {
        const nameScore = fuzzyScore(normalizedQuery, iconName);
        if (nameScore > 0) {
          queryScore = Math.max(queryScore, nameScore * FIELD_WEIGHTS.nameFuzzy);
          matchDetails.fuzzyMatch = true;
          currentFields.push('name');
        }
      }
    }
    
    // Score against tags - FIXED: Now uses properly normalized tags
    for (const tag of iconTags) {
      if (exactMatch) {
        // Exact matching: check for exact word matches using word boundaries
        const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (tag === normalizedQuery) {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.tagExact);
          matchDetails.exactMatch = true;
          currentFields.push('tag');
        } else if (wordBoundaryRegex.test(tag)) {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.tagExact * 0.9);
          matchDetails.exactMatch = true;
          currentFields.push('tag');
        }
      } else {
        // Original substring matching logic
        if (tag.includes(normalizedQuery)) {
          if (tag === normalizedQuery) {
            queryScore = Math.max(queryScore, FIELD_WEIGHTS.tagExact);
            matchDetails.exactMatch = true;
          } else {
            queryScore = Math.max(queryScore, FIELD_WEIGHTS.tagExact * 0.8);
          }
          currentFields.push('tag');
        } else if (fuzzy) {
          const tagScore = fuzzyScore(normalizedQuery, tag);
          if (tagScore > 0) {
            queryScore = Math.max(queryScore, tagScore * FIELD_WEIGHTS.tagFuzzy);
            matchDetails.fuzzyMatch = true;
            currentFields.push('tag');
          }
        }
      }
    }
    
    // Score against category
    if (exactMatch) {
      // Exact matching: check for exact word matches using word boundaries
      const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (iconCategory === normalizedQuery) {
        queryScore = Math.max(queryScore, FIELD_WEIGHTS.categoryExact);
        matchDetails.exactMatch = true;
        currentFields.push('category');
      } else if (wordBoundaryRegex.test(iconCategory)) {
        queryScore = Math.max(queryScore, FIELD_WEIGHTS.categoryExact * 0.9);
        matchDetails.exactMatch = true;
        currentFields.push('category');
      }
    } else {
      // Original substring matching logic
      if (iconCategory.includes(normalizedQuery)) {
        if (iconCategory === normalizedQuery) {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.categoryExact);
          matchDetails.exactMatch = true;
        } else {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.categoryExact * 0.8);
        }
        currentFields.push('category');
      } else if (fuzzy) {
        const categoryScore = fuzzyScore(normalizedQuery, iconCategory);
        if (categoryScore > 0) {
          queryScore = Math.max(queryScore, categoryScore * FIELD_WEIGHTS.categoryFuzzy);
          matchDetails.fuzzyMatch = true;
          currentFields.push('category');
        }
      }
    }
    
    // Check if this is a synonym match
    if (query !== originalQuery.toLowerCase()) {
      queryScore *= 0.9; // Slight penalty for synonym matches
      matchDetails.synonymMatch = true;
    }
    
    // Phonetic matching (disabled in exact match mode)
    if (enablePhonetic && queryScore === 0 && !exactMatch) {
      const fields = [iconName, ...iconTags, iconCategory];
      for (const field of fields) {
        if (phoneticallyMatch(normalizedQuery, field)) {
          queryScore = Math.max(queryScore, FIELD_WEIGHTS.phoneticMatch);
          matchDetails.phoneticMatch = true;
          currentFields.push('phonetic');
          break;
        }
      }
    }
    
    if (queryScore > bestScore) {
      bestScore = queryScore;
      matchedFields = [...currentFields];
    }
  }
  
  // Multi-word query bonus (disabled in exact match mode)
  if (queryWords.length > 1 && !exactMatch) {
    const nameMultiScore = multiWordScore(queryWords, iconName, FIELD_WEIGHTS.nameFuzzy / 10);
    const tagMultiScore = Math.max(...iconTags.map(tag => 
      multiWordScore(queryWords, tag, FIELD_WEIGHTS.tagFuzzy / 10)
    ), 0);
    const categoryMultiScore = multiWordScore(queryWords, iconCategory, FIELD_WEIGHTS.categoryFuzzy / 10);
    
    const multiScore = Math.max(nameMultiScore, tagMultiScore, categoryMultiScore);
    if (multiScore > 0) {
      bestScore = Math.max(bestScore, multiScore);
      matchedFields.push('multi-word');
    }
  }
  
  return bestScore > 0 ? {
    icon,
    score: bestScore,
    matchedFields: [...new Set(matchedFields)],
    matchDetails
  } : null;
}

// Enhanced fallback search with comprehensive scoring
export function fallbackSearch(
  icons: IconItem[], 
  query: string, 
  options: FallbackSearchOptions = {}
): { results: IconItem[]; totalCount: number } {
  const {
    fuzzy = true,
    maxResults = 200,      // Further reduced for precision
    minScore = 20.0,       // Significantly increased for strict filtering
    enableSynonyms = false, // Disabled by default for exact results
    enablePhonetic = false, // Disabled by default - too permissive
    exactMatch = false,
    libraryId
  } = options;
  
  // Smart query length sensitivity - shorter queries need higher scores
  const queryLength = query.trim().length;
  const adaptiveMinScore = queryLength < 4 ? minScore * 2 : minScore;
  
  if (!query?.trim() || !icons.length) return { results: [], totalCount: 0 };
  
  // Filter icons by library if specified
  let filteredIcons = icons;
  if (libraryId && libraryId !== 'all') {
    filteredIcons = icons.filter(icon => {
      // Extract library from icon id (assuming format: libraryId-iconName or similar)
      const iconLibrary = icon.id.split('-')[0];
      return iconLibrary === libraryId;
    });
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Expand query with synonyms and extract words (disabled in exact match mode)
  const expandedQueries = (enableSynonyms && !exactMatch) ? 
    expandQueryWithSynonyms(normalizedQuery) : 
    [normalizedQuery];
  const queryWords = extractWords(normalizedQuery);
  
  const results: SearchResult[] = [];
  
  // Score all icons
  for (const icon of filteredIcons) {
    // Filter out icons with invalid svg data early
    if (!icon.svg) continue;
    
    const result = calculateIconScore(
      icon, 
      normalizedQuery, 
      expandedQueries, 
      queryWords, 
      options
    );
    
    if (result && result.score >= adaptiveMinScore) {
      results.push(result);
    }
  }
  
  // Sort by score (descending) and limit results
  const sortedResults = results
    .sort((a, b) => {
      // Primary sort by score
      if (b.score !== a.score) return b.score - a.score;
      
      // Secondary sort by match quality
      if (a.matchDetails.exactMatch && !b.matchDetails.exactMatch) return -1;
      if (!a.matchDetails.exactMatch && b.matchDetails.exactMatch) return 1;
      
      // Tertiary sort by name length (shorter names first for exact matches)
      return a.icon.name.length - b.icon.name.length;
    });

  const totalCount = sortedResults.length;
  const limitedResults = sortedResults.slice(0, maxResults);
  
  return { 
    results: limitedResults.map(result => result.icon),
    totalCount 
  };
}