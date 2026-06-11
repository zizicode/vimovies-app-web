import { create } from 'zustand'

import { MoviesService } from '../../services/movies.service'
import type { Media } from '../../types';

interface MoviesState {
  movies: Media[]
  loading: boolean
  error: string | null
  featuredIndex: number | null
  isFetched: boolean
  generateFeaturedMovie: () => void
  fetchMovies: () => Promise<void>
  refetchMovies: () => Promise<void>
}

export const useMoviesStore = create<MoviesState>((set) => ({
  movies: [],
  loading: false,
  error: null,
  featuredIndex: 0,
  isFetched: false,
  generateFeaturedMovie: () =>
    set((state) => ({
      featuredIndex:
        state.movies.length > 0
          ? Math.floor(
              Math.random() *
              state.movies.length
            )
          : null
    })),

  fetchMovies: async () => {
    try {
      set({ loading: true })

      const { data } =
        await MoviesService.getAll({
          sort_by: 'tmdb_popularity',
          sort_order: 'desc'
        })

      set({
        movies: data.data,
        loading: false,
        isFetched: true,
      })
    } catch {
      set({
        error: 'Error loading movies',
        loading: false,
        isFetched: true,
      })
    }
  },

  refetchMovies: async () => {
    try {
      set({ loading: true })

      const { data } =
        await MoviesService.getAll({
          sort_by: 'tmdb_popularity',
          sort_order: 'desc'
        })

      set({
        movies: data.data,
        loading: false,
        isFetched: true,
      })
    } catch {
      set({
        error: 'Error loading movies',
        loading: false,
        isFetched: true,
      })
    }
  },
}))