import { create } from 'zustand'
import type { Genre } from '../../types'
import { GenresService } from '../../services/genres.service'

interface GenreState {
    genres: Genre[]
    loading: boolean
    error: string | null
    fetchGenres: () => Promise<void>
  }

export const useGenresStore = create<GenreState>((set) => ({
    genres: [],
    loading: false,
    error: '',
    fetchGenres: async () => {
        // Si ya hay géneros, no volvemos a pedir
        const currentGenres = useGenresStore.getState().genres;
        if (currentGenres.length > 0) return;

        try {
          set({ loading: true })
    
          const { data } =
            await GenresService.getAll()
    
          set({
            genres : data.data,
            loading: false,
          })
        } catch {
          set({
            error: 'Error loading genres',
            loading: false,
          })
        }
      },
}))