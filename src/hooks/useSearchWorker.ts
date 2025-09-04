import { useEffect, useRef, useCallback, useState } from 'react';
import { type IconItem } from '@/types/icon';

interface SearchWorkerHook {
  search: (query: string, options?: { maxResults?: number; fuzzy?: boolean; enableSynonyms?: boolean; enablePhonetic?: boolean }) => Promise<IconItem[]>;
  indexLibrary: (libraryId: string, icons: IconItem[]) => Promise<void>;
  clearIndex: (libraryId?: string) => Promise<void>;
  isReady: boolean;
  isSearching: boolean;
}

export function useSearchWorker(): SearchWorkerHook {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const pendingCallbacks = useRef<Map<string, {
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }>>(new Map());

  // Initialize worker
  useEffect(() => {
    try {
      // Create worker from the search worker file
      workerRef.current = new Worker(
        new URL('@/workers/searchWorker.ts', import.meta.url),
        { type: 'module' }
      );

      workerRef.current.onmessage = (event) => {
        const { type, libraryId, results, query, success, error } = event.data;
        
        if (error) {
          console.error('Search worker error:', error);
          // Reject all pending promises
          for (const [, callbacks] of pendingCallbacks.current) {
            callbacks.reject(new Error(error));
          }
          pendingCallbacks.current.clear();
          return;
        }

        switch (type) {
          case 'indexComplete':
            const indexKey = `index-${libraryId}`;
            const indexCallbacks = pendingCallbacks.current.get(indexKey);
            if (indexCallbacks) {
              indexCallbacks.resolve(success);
              pendingCallbacks.current.delete(indexKey);
            }
            break;

          case 'searchResults':
            setIsSearching(false);
            const searchKey = `search-${query}`;
            const searchCallbacks = pendingCallbacks.current.get(searchKey);
            if (searchCallbacks) {
              searchCallbacks.resolve(results || []);
              pendingCallbacks.current.delete(searchKey);
            }
            break;

          case 'clearComplete':
            const clearKey = `clear-${libraryId}`;
            const clearCallbacks = pendingCallbacks.current.get(clearKey);
            if (clearCallbacks) {
              clearCallbacks.resolve(true);
              pendingCallbacks.current.delete(clearKey);
            }
            break;
        }
      };

      workerRef.current.onerror = (error) => {
        console.error('Search worker error:', error);
        setIsReady(false);
        // Reject all pending promises
        for (const [, callbacks] of pendingCallbacks.current) {
          callbacks.reject(error);
        }
        pendingCallbacks.current.clear();
      };

      setIsReady(true);
    } catch (error) {
      console.warn('Search worker not available, falling back to main thread search');
      setIsReady(false);
    }

    // Cleanup
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      pendingCallbacks.current.clear();
      setIsReady(false);
    };
  }, []);

  // Search function
  const search = useCallback(async (
    query: string, 
    options: { maxResults?: number; fuzzy?: boolean; enableSynonyms?: boolean; enablePhonetic?: boolean } = {}
  ): Promise<IconItem[]> => {
    if (!workerRef.current || !isReady || !query.trim()) {
      return [];
    }

    setIsSearching(true);
    
    return new Promise((resolve, reject) => {
      const key = `search-${query}`;
      pendingCallbacks.current.set(key, { resolve, reject });
      
      // Send search message with enhanced options
      workerRef.current!.postMessage({
        type: 'search',
        query: query.trim(),
        options: {
          maxResults: 1000,
          fuzzy: true,
          enableSynonyms: true,
          enablePhonetic: true,
          minScore: 0.1,
          ...options
        }
      });

      // Set timeout to prevent hanging
      setTimeout(() => {
        if (pendingCallbacks.current.has(key)) {
          pendingCallbacks.current.delete(key);
          setIsSearching(false);
          reject(new Error('Search timeout'));
        }
      }, 5000); // 5 second timeout
    });
  }, [isReady]);

  // Index library function
  const indexLibrary = useCallback(async (libraryId: string, icons: IconItem[]): Promise<void> => {
    if (!workerRef.current || !isReady) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const key = `index-${libraryId}`;
      pendingCallbacks.current.set(key, { resolve, reject });
      
      // Send index message
      workerRef.current!.postMessage({
        type: 'index',
        libraryId,
        icons
      });

      // Set timeout
      setTimeout(() => {
        if (pendingCallbacks.current.has(key)) {
          pendingCallbacks.current.delete(key);
          reject(new Error('Index timeout'));
        }
      }, 10000); // 10 second timeout for indexing
    });
  }, [isReady]);

  // Clear index function
  const clearIndex = useCallback(async (libraryId?: string): Promise<void> => {
    if (!workerRef.current || !isReady) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const key = `clear-${libraryId || 'all'}`;
      pendingCallbacks.current.set(key, { resolve, reject });
      
      // Send clear message
      workerRef.current!.postMessage({
        type: 'clear',
        libraryId
      });

      // Set timeout
      setTimeout(() => {
        if (pendingCallbacks.current.has(key)) {
          pendingCallbacks.current.delete(key);
          reject(new Error('Clear timeout'));
        }
      }, 3000); // 3 second timeout
    });
  }, [isReady]);

  return {
    search,
    indexLibrary,
    clearIndex,
    isReady,
    isSearching
  };
}