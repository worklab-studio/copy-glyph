import { useState, useEffect, useCallback } from 'react';
import { type IconItem } from '@/types/icon';
import { iconLibraryManager } from '@/services/IconLibraryManager';

interface UseAsyncIconLibraryState {
  icons: IconItem[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
  initialLoaded: boolean;
  loadingRemaining: boolean;
  totalLoadProgress: number;
}

interface UseAsyncIconLibraryReturn extends UseAsyncIconLibraryState {
  loadLibrary: (libraryId: string) => Promise<void>;
  loadAllLibraries: () => Promise<void>;
  loadInitialBatch: () => Promise<void>;
  loadRemainingIcons: () => Promise<void>;
  searchIcons: (query: string, libraryIds?: string[]) => IconItem[];
  clearError: () => void;
}

export function useAsyncIconLibrary(): UseAsyncIconLibraryReturn {
  const [state, setState] = useState<UseAsyncIconLibraryState>({
    icons: [],
    loading: false,
    error: null,
    loaded: false,
    initialLoaded: false,
    loadingRemaining: false,
    totalLoadProgress: 0
  });

  // Load a specific library
  const loadLibrary = useCallback(async (libraryId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const icons = await iconLibraryManager.loadLibrary(libraryId);
      setState({
        icons,
        loading: false,
        error: null,
        loaded: true,
        initialLoaded: false,
        loadingRemaining: false,
        totalLoadProgress: 0
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load library',
        loaded: false
      }));
    }
  }, []);

  // Load initial batch (100 icons)
  const loadInitialBatch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null, totalLoadProgress: 0 }));
    
    try {
      const icons = await iconLibraryManager.loadInitialBatch();
      setState(prev => ({
        ...prev,
        icons,
        loading: false,
        error: null,
        loaded: true,
        initialLoaded: true,
        totalLoadProgress: 25 // 25% complete after initial batch
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load initial icons',
        loaded: false
      }));
    }
  }, []);

  // Load remaining icons after initial batch
  const loadRemainingIcons = useCallback(async () => {
    if (!state.initialLoaded) return;

    setState(prev => ({ ...prev, loadingRemaining: true, totalLoadProgress: 50 }));
    
    try {
      const excludeIds = state.icons.map(icon => icon.id);
      const remainingIcons = await iconLibraryManager.loadRemainingIcons(excludeIds);
      
      setState(prev => ({
        ...prev,
        icons: [...prev.icons, ...remainingIcons],
        loadingRemaining: false,
        totalLoadProgress: 100
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loadingRemaining: false,
        error: error instanceof Error ? error.message : 'Failed to load remaining icons'
      }));
    }
  }, [state.initialLoaded, state.icons]);

  // Load all libraries - now uses staged approach
  const loadAllLibraries = useCallback(async () => {
    // Start with initial batch
    await loadInitialBatch();
    
    // Load remaining icons in background
    setTimeout(() => {
      loadRemainingIcons();
    }, 100);
  }, [loadInitialBatch, loadRemainingIcons]);

  // Search icons (only in loaded libraries)
  const searchIcons = useCallback((query: string, libraryIds?: string[]): IconItem[] => {
    return iconLibraryManager.searchIcons(query, libraryIds);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    loadLibrary,
    loadAllLibraries,
    loadInitialBatch,
    loadRemainingIcons,
    searchIcons,
    clearError
  };
}

// Hook for multiple libraries
export function useMultipleIconLibraries(libraryIds: string[]) {
  const [state, setState] = useState<{
    librariesMap: Map<string, IconItem[]>;
    loading: boolean;
    error: string | null;
    loadedLibraries: Set<string>;
  }>({
    librariesMap: new Map(),
    loading: false,
    error: null,
    loadedLibraries: new Set()
  });

  const loadLibraries = useCallback(async (ids: string[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const librariesMap = await iconLibraryManager.loadLibraries(ids);
      setState({
        librariesMap,
        loading: false,
        error: null,
        loadedLibraries: new Set(ids)
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load libraries'
      }));
    }
  }, []);

  // Auto-load when libraryIds change
  useEffect(() => {
    if (libraryIds.length > 0) {
      loadLibraries(libraryIds);
    }
  }, [libraryIds, loadLibraries]);

  return {
    ...state,
    loadLibraries
  };
}

// Hook for library metadata (synchronous)
export function useIconLibraryMetadata() {
  return {
    libraries: iconLibraryManager.libraries,
    totalCount: iconLibraryManager.libraries.reduce((sum, lib) => sum + lib.count, 0)
  };
}