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
  matchType: 'exact' | 'fuzzy' | 'phonetic' | 'synonym';
  matchDetail: string;
}

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

export function calculateIconScore(
  icon: IconItem,
  originalQuery: string,
  expandedQueries: string[],
  queryWords: string[],
  options: FallbackSearchOptions = {}
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

  console.log(`[Fallback Debug] Scoring icon "${icon.name}" (ID: ${icon.id}) against "${normalizedQuery}"`);

  // STRICT EXACT MATCH MODE
  if (exactMatch) {
    console.log(`[Fallback Debug] Using exact match mode for "${icon.name}"`);
    
    // 1. Exact name match
    if (normalizedName === normalizedQuery) {
      totalScore += FIELD_WEIGHTS.exactNameMatch;
      matchedFields.push('name');
      matchDetail = `Exact name match: "${normalizedName}"`;
      console.log(`[Fallback Debug] ✓ Exact name match found for "${icon.name}"`);
    }

    // 2. Exact tag matches
    for (const tag of normalizedTags) {
      if (tag === normalizedQuery) {
        totalScore += FIELD_WEIGHTS.exactTagMatch;
        matchedFields.push('tags');
        matchDetail += (matchDetail ? ' + ' : '') + `Exact tag match: "${tag}"`;
        console.log(`[Fallback Debug] ✓ Exact tag match found: "${tag}" for "${icon.name}"`);
      }
    }

    // 3. Exact category match
    if (normalizedCategory === normalizedQuery) {
      totalScore += FIELD_WEIGHTS.exactCategoryMatch;
      matchedFields.push('category');
      matchDetail += (matchDetail ? ' + ' : '') + `Exact category match: "${normalizedCategory}"`;
      console.log(`[Fallback Debug] ✓ Exact category match found for "${icon.name}"`);
    }

    // NO fuzzy, phonetic, or synonym matching in exact mode
    if (totalScore === 0) {
      console.log(`[Fallback Debug] ✗ No exact matches found for "${icon.name}"`);
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

  console.log(`[Fallback Debug] Final score for "${icon.name}": ${totalScore} (${result.matchDetail})`);
  return result;
}

export function fallbackSearch(
  icons: IconItem[], 
  query: string, 
  options: FallbackSearchOptions = {}
): { results: IconItem[]; totalCount: number } {
  const {
    maxResults = 50,
    minScore = 0.1,
    fuzzy = true,
    enableSynonyms = true,
    enablePhonetic = true,
    exactMatch = false,
    libraryId
  } = options;

  // Preprocess and validate query
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) {
    console.log(`[Fallback Debug] Empty query provided`);
    return { results: [], totalCount: 0 };
  }

  console.log(`[Fallback Debug] Starting fallback search for "${normalizedQuery}" with options:`, {
    maxResults,
    minScore,
    fuzzy: fuzzy && !exactMatch, // Disable fuzzy when exact match is enabled
    enableSynonyms: enableSynonyms && !exactMatch, // Disable synonyms when exact match is enabled
    enablePhonetic: enablePhonetic && !exactMatch, // Disable phonetic when exact match is enabled
    exactMatch,
    libraryId
  });

  // Filter by library if specified
  let filteredIcons = icons;
  if (libraryId) {
    filteredIcons = icons.filter(icon => {
      // Assuming icon.id contains library info, or add library field to IconItem
      return icon.id.startsWith(libraryId + ':') || icon.id.includes(libraryId);
    });
  }

  console.log(`[Fallback Debug] Filtering ${icons.length} icons${libraryId ? ` by library ${libraryId}` : ''} -> ${filteredIcons.length} icons`);

  // For exact match, disable expansions
  const expandedQueries = (enableSynonyms && !exactMatch) ? expandQueryWithSynonyms(normalizedQuery) : [normalizedQuery];
  const queryWords = extractWords(normalizedQuery);

  console.log(`[Fallback Debug] Query expansion:`, expandedQueries);

  const results: SearchResult[] = [];

  // Score each icon
  for (const icon of filteredIcons) {
    // For exact match mode, pass modified options to disable fuzzy features
    const scoringOptions = exactMatch ? {
      ...options,
      fuzzy: false,
      enableSynonyms: false,
      enablePhonetic: false,
      exactMatch: true
    } : options;

    const result = calculateIconScore(icon, normalizedQuery, expandedQueries, queryWords, scoringOptions);
    if (result && result.score >= minScore) {
      results.push(result);
    }
  }

  console.log(`[Fallback Debug] Scored ${results.length} icons with score >= ${minScore}`);

  // For exact match mode, use stricter scoring
  const queryLength = normalizedQuery.length;
  let adjustedMinScore = minScore;
  
  if (exactMatch) {
    // In exact match mode, only accept perfect matches (score should be high)
    adjustedMinScore = Math.max(minScore, 0.8);
  } else {
    // Adaptive scoring based on query length for non-exact mode
    if (queryLength <= 2) {
      adjustedMinScore = Math.max(minScore, 0.8); // Very strict for short queries
    } else if (queryLength <= 4) {
      adjustedMinScore = Math.max(minScore, 0.3); // Moderately strict
    }
  }

  const filteredResults = results.filter(result => result.score >= adjustedMinScore);

  console.log(`[Fallback Debug] After adjusted min score (${adjustedMinScore}): ${filteredResults.length} icons`);

  // Sort by score (descending), then by match type priority, then by name
  const matchTypePriority = { exact: 4, synonym: 3, fuzzy: 2, phonetic: 1 };
  
  filteredResults.sort((a, b) => {
    // Primary: Score
    if (b.score !== a.score) return b.score - a.score;
    
    // Secondary: Match type
    const aPriority = matchTypePriority[a.matchType] || 0;
    const bPriority = matchTypePriority[b.matchType] || 0;
    if (bPriority !== aPriority) return bPriority - aPriority;
    
    // Tertiary: Alphabetical by name
    return a.icon.name.localeCompare(b.icon.name);
  });

  const totalCount = filteredResults.length;
  const limitedResults = filteredResults.slice(0, maxResults);

  console.log(`[Fallback Debug] Top 5 results:`, limitedResults.slice(0, 5).map(r => ({
    name: r.icon.name,
    score: r.score,
    matchDetail: r.matchDetail
  })));

  console.log(`[Fallback Debug] Fallback search completed. Returned ${limitedResults.length} results out of ${totalCount} total matches.`);

  return {
    results: limitedResults.map(result => result.icon),
    totalCount
  };
}