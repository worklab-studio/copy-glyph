import { useState, useEffect, useCallback } from 'react';
import { type IconItem } from '@/types/icon';
import { iconLibraryManager } from '@/services/IconLibraryManager';

interface UseAsyncIconLibraryState {
  icons: IconItem[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

interface UseAsyncIconLibraryReturn extends UseAsyncIconLibraryState {
  loadLibrary: (libraryId: string) => Promise<void>;
  loadAllLibraries: () => Promise<void>;
  searchIcons: (query: string, libraryIds?: string[]) => IconItem[];
  clearError: () => void;
}

export function useAsyncIconLibrary(): UseAsyncIconLibraryReturn {
  const [state, setState] = useState<UseAsyncIconLibraryState>({
    icons: [],
    loading: false,
    error: null,
    loaded: false
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
        loaded: true
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

  // Load all libraries
  const loadAllLibraries = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const icons = await iconLibraryManager.loadAllLibraries();
      setState({
        icons,
        loading: false,
        error: null,
        loaded: true
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load libraries',
        loaded: false
      }));
    }
  }, []);

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