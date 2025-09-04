import { type IconItem } from '@/types/icon';

// Lightweight metadata structure for initial load
export interface IconLibraryMetadata {
  id: string;
  name: string;
  count: number;
  style: string;
  description?: string;
}

// Cache configuration
const CACHE_KEY_PREFIX = 'icon-library-';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 10; // Maximum number of libraries to keep in memory

interface CachedLibrary {
  icons: IconItem[];
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

class IconLibraryManager {
  private cache = new Map<string, CachedLibrary>();
  private loadingPromises = new Map<string, Promise<IconItem[]>>();
  private searchIndex = new Map<string, Set<string>>();

  // Library metadata - loaded synchronously for initial UI
  public readonly libraries: IconLibraryMetadata[] = [
    { id: 'material', name: 'Material Design', count: 7000, style: 'filled' },
    { id: 'atlas', name: 'Atlas Icons', count: 300, style: 'outline' },
    { id: 'lucide', name: 'Lucide', count: 1500, style: 'outline' },
    { id: 'feather', name: 'Feather', count: 287, style: 'outline' },
    { id: 'solar', name: 'Solar', count: 7000, style: 'mixed' },
    { id: 'phosphor', name: 'Phosphor', count: 9000, style: 'mixed' },
    { id: 'tabler', name: 'Tabler', count: 5000, style: 'outline' },
    { id: 'bootstrap', name: 'Bootstrap', count: 2000, style: 'filled' },
    { id: 'remix', name: 'Remix', count: 2800, style: 'mixed' },
    { id: 'boxicons', name: 'BoxIcons', count: 1600, style: 'mixed' },
    { id: 'css-gg', name: 'CSS.gg', count: 700, style: 'outline' },
    { id: 'iconsax', name: 'Iconsax', count: 6000, style: 'mixed' },
    { id: 'line', name: 'Line Icons', count: 500, style: 'outline' },
    { id: 'pixelart', name: 'Pixelart Icons', count: 400, style: 'pixel' },
    { id: 'teeny', name: 'Teeny Icons', count: 2000, style: 'outline' },
    { id: 'ant', name: 'Ant Design', count: 800, style: 'mixed' },
    { id: 'fluent', name: 'Fluent UI', count: 2000, style: 'mixed' },
    { id: 'iconnoir', name: 'IconNoir', count: 1400, style: 'outline' },
    { id: 'octicons', name: 'Octicons', count: 600, style: 'filled' },
    { id: 'radix', name: 'Radix Icons', count: 300, style: 'filled' },
    { id: 'animated', name: 'Animated', count: 100, style: 'animated' },
  ];

  // Preload popular libraries in background
  private readonly popularLibraries = ['material', 'lucide', 'feather'];

  constructor() {
    // Start preloading popular libraries after a short delay
    setTimeout(() => this.preloadPopularLibraries(), 1000);
    
    // Clean up old cache entries on startup
    this.clearOldCacheEntries();
    this.cleanupExpiredCache();
    
    // Set up periodic cache cleanup
    setInterval(() => {
      this.clearOldCacheEntries();
      this.cleanupExpiredCache();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  // Dynamic import functions for each library
  private async importLibrary(libraryId: string): Promise<IconItem[]> {
    try {
      switch (libraryId) {
        case 'material':
          const materialModule = await import('@/data/material-icons');
          return materialModule.materialIcons;
        
        case 'atlas':
          const atlasModule = await import('@/data/atlas-icons');
          return atlasModule.atlasIcons;
        
        case 'lucide':
          const lucideModule = await import('@/data/lucide-icons');
          return lucideModule.lucideIcons;
        
        case 'feather':
          const featherModule = await import('@/data/feather-icons');
          return featherModule.featherIcons;
        
        case 'solar':
          const solarModule = await import('@/data/solar-icons');
          return solarModule.solarIcons;
        
        case 'phosphor':
          const phosphorModule = await import('@/data/phosphor-icons');
          return phosphorModule.phosphorIcons;
        
        case 'tabler':
          const tablerModule = await import('@/data/tabler-icons');
          return tablerModule.tablerIcons;
        
        case 'bootstrap':
          const bootstrapModule = await import('@/data/bootstrap-icons');
          return bootstrapModule.bootstrapIcons;
        
        case 'remix':
          const remixModule = await import('@/data/remix-icons');
          return remixModule.remixIcons;
        
        case 'boxicons':
          const boxiconsModule = await import('@/data/boxicons');
          return boxiconsModule.boxicons;
        
        case 'css-gg':
          const cssGgModule = await import('@/data/css-gg-icons');
          return cssGgModule.default;
        
        case 'iconsax':
          const iconsaxModule = await import('@/data/iconsax-icons');
          return iconsaxModule.iconsaxIcons;
        
        case 'line':
          const lineModule = await import('@/data/line-icons');
          return lineModule.lineIcons;
        
        case 'pixelart':
          const pixelartModule = await import('@/data/pixelart-icons');
          return pixelartModule.pixelartIcons;
        
        case 'teeny':
          const teenyModule = await import('@/data/teeny-icons');
          return teenyModule.teenyIcons;
        
        case 'ant':
          const antModule = await import('@/data/ant-icons');
          return antModule.antIcons;
        
        case 'fluent':
          const fluentModule = await import('@/data/fluent-icons');
          return fluentModule.fluentIcons;
        
        case 'iconnoir':
          const iconnoirModule = await import('@/data/iconnoir-icons');
          return iconnoirModule.iconnoirIcons;
        
        case 'octicons':
          const octiconsModule = await import('@/data/octicons-icons');
          return octiconsModule.octiconsIcons;
        
        case 'radix':
          const radixModule = await import('@/data/radix-icons');
          return radixModule.radixIcons;
        
        case 'animated':
          const animatedModule = await import('@/data/animated-icons');
          return animatedModule.animatedIcons;
        
        default:
          throw new Error(`Unknown library: ${libraryId}`);
      }
    } catch (error) {
      console.error(`Failed to load library ${libraryId}:`, error);
      return [];
    }
  }

  // Load library with caching and deduplication
  async loadLibrary(libraryId: string): Promise<IconItem[]> {
    // Check memory cache first
    const cached = this.cache.get(libraryId);
    if (cached && !this.isCacheExpired(cached)) {
      // Update access stats
      cached.accessCount++;
      cached.lastAccessed = Date.now();
      return cached.icons;
    }

    // Check if already loading
    if (this.loadingPromises.has(libraryId)) {
      return this.loadingPromises.get(libraryId)!;
    }

    // Start loading
    const loadPromise = this.loadLibraryInternal(libraryId);
    this.loadingPromises.set(libraryId, loadPromise);

    try {
      const icons = await loadPromise;
      this.loadingPromises.delete(libraryId);
      return icons;
    } catch (error) {
      this.loadingPromises.delete(libraryId);
      throw error;
    }
  }

  private async loadLibraryInternal(libraryId: string): Promise<IconItem[]> {
    // Try localStorage cache first
    const localCache = this.getFromLocalStorage(libraryId);
    if (localCache && !this.isCacheExpired(localCache)) {
      this.updateMemoryCache(libraryId, localCache.icons);
      return localCache.icons;
    }

    // Load from network/import
    const icons = await this.importLibrary(libraryId);
    
    // Cache the result
    this.updateMemoryCache(libraryId, icons);
    this.saveToLocalStorage(libraryId, icons);
    
    // Update search index
    this.updateSearchIndex(libraryId, icons);
    
    return icons;
  }

  // Get multiple libraries
  async loadLibraries(libraryIds: string[]): Promise<Map<string, IconItem[]>> {
    const results = new Map<string, IconItem[]>();
    const promises = libraryIds.map(async (id) => {
      const icons = await this.loadLibrary(id);
      results.set(id, icons);
    });
    
    await Promise.all(promises);
    return results;
  }

  // Load all libraries (for "all" view)
  async loadAllLibraries(): Promise<IconItem[]> {
    const libraryIds = this.libraries.map(lib => lib.id);
    const libraryMap = await this.loadLibraries(libraryIds);
    
    const allIcons: IconItem[] = [];
    for (const [, icons] of libraryMap) {
      allIcons.push(...icons);
    }
    
    return allIcons;
  }

  // Search across loaded libraries
  searchIcons(query: string, libraryIds?: string[]): IconItem[] {
    if (!query.trim()) return [];
    
    const searchQuery = query.toLowerCase();
    const results: IconItem[] = [];
    
    for (const [libraryId, cached] of this.cache) {
      if (libraryIds && !libraryIds.includes(libraryId)) continue;
      
      for (const icon of cached.icons) {
        if (
          icon.name.toLowerCase().includes(searchQuery) ||
          icon.tags?.some(tag => tag.toLowerCase().includes(searchQuery)) ||
          icon.category?.toLowerCase().includes(searchQuery)
        ) {
          results.push(icon);
        }
      }
    }
    
    return results;
  }

  // Preload popular libraries
  private async preloadPopularLibraries() {
    try {
      await Promise.allSettled(
        this.popularLibraries.map(id => this.loadLibrary(id))
      );
    } catch (error) {
      console.warn('Failed to preload popular libraries:', error);
    }
  }

  // Cache management
  private updateMemoryCache(libraryId: string, icons: IconItem[]) {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= MAX_CACHE_SIZE && !this.cache.has(libraryId)) {
      this.evictLeastRecentlyUsed();
    }

    this.cache.set(libraryId, {
      icons,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now()
    });
  }

  private evictLeastRecentlyUsed() {
    let oldestAccess = Date.now();
    let oldestKey = '';

    for (const [key, cached] of this.cache) {
      if (cached.lastAccessed < oldestAccess) {
        oldestAccess = cached.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      localStorage.removeItem(CACHE_KEY_PREFIX + oldestKey);
    }
  }

  private isCacheExpired(cached: CachedLibrary): boolean {
    return Date.now() - cached.timestamp > CACHE_EXPIRY_MS;
  }

  // LocalStorage cache with size management
  private saveToLocalStorage(libraryId: string, icons: IconItem[]) {
    try {
      // Don't cache large icon libraries with React components - only cache metadata
      if (icons.length > 100) {
        console.log(`Skipping localStorage cache for large library: ${libraryId} (${icons.length} icons)`);
        return;
      }
      
      // Create lightweight version without React components
      const lightweightIcons = icons.map(icon => ({
        id: icon.id,
        name: icon.name,
        tags: icon.tags,
        category: icon.category,
        style: icon.style,
        // Only store string SVGs, not React components
        svg: typeof icon.svg === 'string' ? icon.svg : null
      }));
      
      const data = {
        icons: lightweightIcons,
        timestamp: Date.now(),
        accessCount: 1,
        lastAccessed: Date.now()
      };
      
      const serialized = JSON.stringify(data);
      if (serialized.length < 2 * 1024 * 1024) { // 2MB limit
        localStorage.setItem(CACHE_KEY_PREFIX + libraryId, serialized);
      } else {
        console.warn(`Data too large to cache: ${libraryId} (${(serialized.length / 1024 / 1024).toFixed(2)}MB)`);
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
      // Try to clear some space by removing old cache entries
      this.clearOldCacheEntries();
    }
  }

  private clearOldCacheEntries() {
    try {
      // Remove expired entries first
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key?.startsWith(CACHE_KEY_PREFIX)) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '');
            if (Date.now() - data.timestamp > CACHE_EXPIRY_MS) {
              localStorage.removeItem(key);
            }
          } catch {
            localStorage.removeItem(key);
          }
        }
      }
      
      // If still over quota, remove least recently used entries
      const cacheEntries: { key: string; lastAccessed: number }[] = [];
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key?.startsWith(CACHE_KEY_PREFIX)) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '');
            cacheEntries.push({ key, lastAccessed: data.lastAccessed || 0 });
          } catch {
            localStorage.removeItem(key);
          }
        }
      }
      
      // Sort by last accessed and remove oldest if we have too many entries
      cacheEntries.sort((a, b) => a.lastAccessed - b.lastAccessed);
      while (cacheEntries.length > 5) { // Keep only 5 most recent libraries
        const oldest = cacheEntries.shift();
        if (oldest) {
          localStorage.removeItem(oldest.key);
        }
      }
    } catch (error) {
      console.warn('Failed to clear old cache entries:', error);
    }
  }

  private getFromLocalStorage(libraryId: string): CachedLibrary | null {
    try {
      const data = localStorage.getItem(CACHE_KEY_PREFIX + libraryId);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      // Clean up corrupted data
      localStorage.removeItem(CACHE_KEY_PREFIX + libraryId);
      return null;
    }
  }

  private cleanupExpiredCache() {
    // Clean localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '');
          if (Date.now() - data.timestamp > CACHE_EXPIRY_MS) {
            localStorage.removeItem(key);
          }
        } catch {
          localStorage.removeItem(key);
        }
      }
    }

    // Clean memory cache
    for (const [key, cached] of this.cache) {
      if (this.isCacheExpired(cached)) {
        this.cache.delete(key);
      }
    }
  }

  // Search index management
  private updateSearchIndex(libraryId: string, icons: IconItem[]) {
    const indexSet = new Set<string>();
    
    for (const icon of icons) {
      // Add searchable terms
      indexSet.add(icon.name.toLowerCase());
      if (icon.category) indexSet.add(icon.category.toLowerCase());
      if (icon.tags) {
        icon.tags.forEach(tag => indexSet.add(tag.toLowerCase()));
      }
    }
    
    this.searchIndex.set(libraryId, indexSet);
  }

  // Get library statistics
  getCacheStats() {
    return {
      memoryCount: this.cache.size,
      loadingCount: this.loadingPromises.size,
      indexedLibraries: this.searchIndex.size,
      totalLibraries: this.libraries.length
    };
  }
}

// Export singleton instance
export const iconLibraryManager = new IconLibraryManager();