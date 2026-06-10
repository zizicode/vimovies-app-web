import { create } from 'zustand'
import type { Genre } from '../../types'
import { GenresService } from '../../services/genres.service'

interface GenreState {
    genres: Genre[]
    loading: boolean
    error: string | null
    isFetched: boolean
    fetchGenres: () => Promise<void>
    refetchGenres: () => Promise<void>
  }

export const useGenresStore = create<GenreState>((set) => ({
    genres: [],
    loading: false,
    error: '',
    isFetched: false,
    fetchGenres: async () => {
        // Si ya se intentó cargar, no volvemos a pedir
        const state = useGenresStore.getState();
        if (state.isFetched) return;

        try {
          set({ loading: true })

          const { data } =
            await GenresService.getAll()

          set({
            genres : data.data,
            loading: false,
            isFetched: true,
          })
        } catch {
          set({
            error: 'Error loading genres',
            loading: false,
            isFetched: true,
          })
        }
      },

      refetchGenres: async () => {
        try {
          set({ loading: true })

          const { data } =
            await GenresService.getAll()

          set({
            genres : data.data,
            loading: false,
            isFetched: true,
          })
        } catch {
          set({
            error: 'Error loading genres',
            loading: false,
            isFetched: true,
          })
        }
      },
}))