import { create } from 'zustand'
import type { Platform } from '../../types'
import { PlatformsService } from '../../services/platforms.service'

interface PlatformState {
  platforms: Platform[]
  loading: boolean
  error: string | null
  fetchPlatforms: () => Promise<void>
}

export const usePlatformsStore = create<PlatformState>((set) => ({
  platforms: [],
  loading: false,
  error: null,
  fetchPlatforms: async () => {
    // Si ya hay plataformas, no volvemos a pedir
    const currentPlatforms = usePlatformsStore.getState().platforms;
    if (currentPlatforms.length > 0) return;

    try {
      set({ loading: true })

      const { data } = await PlatformsService.getAll()

      set({
        platforms: data.data,
        loading: false,
      })
    } catch {
      set({
        error: 'Error loading platforms',
        loading: false,
      })
    }
  },
}))
