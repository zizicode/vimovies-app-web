import { create } from 'zustand'

import { MoviesService } from '../../services/movies.service'
import type { Media } from '../../types';

interface MoviesState {
  movies: Media[]
  loading: boolean
  error: string | null
  featuredIndex: number | null
  generateFeaturedMovie: () => void
  fetchMovies: () => Promise<void>
}

export const useMoviesStore = create<MoviesState>((set) => ({
  movies: [],
  loading: false,
  error: null,
  featuredIndex: 0,
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
    // Si ya hay películas, no volvemos a pedir (o podrías implementar un refresh forzado)
    const currentMovies = useMoviesStore.getState().movies;
    if (currentMovies.length > 0) return;

    try {
      set({ loading: true })

      const { data } =
        await MoviesService.getAll()

      set({
        movies: data.data,
        loading: false,
      })
    } catch {
      set({
        error: 'Error loading movies',
        loading: false,
      })
    }
  },
}))