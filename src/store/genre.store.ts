import { create } from 'zustand'
import type { GenreWithMediaResponse } from '../lib/api/genres'
import type { GenreStats } from '../lib/api/genres'

interface GenreState {
  genreData: GenreWithMediaResponse | null
  allMediaData: unknown
  genresStats: GenreStats[]
  loading: boolean
  error: string | null
}

interface GenreActions {
  setGenreData: (data: GenreWithMediaResponse | null) => void
  setAllMediaData: (data: unknown) => void
  setGenresStats: (stats: GenreStats[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clear: () => void
}

export type GenreStore = GenreState & GenreActions

export const useGenreStore = create<GenreStore>((set) => ({
  // State
  genreData: null,
  allMediaData: null,
  genresStats: [],
  loading: true,
  error: null,

  // Actions
  setGenreData: (data) => set({ genreData: data }),
  setAllMediaData: (data) => set({ allMediaData: data }),
  setGenresStats: (stats) => set({ genresStats: stats }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clear: () => set({ genreData: null, allMediaData: null, genresStats: [], loading: true, error: null }),
}))
