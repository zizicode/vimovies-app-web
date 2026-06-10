import { create } from 'zustand'
import { peopleApi } from '../../lib/api/people'
import type { Person } from '../../types'

interface PersonState {
  personDetail: any | null
  isLoadingDetail: boolean
  errorDetail: string | null
  fetchPersonBySlug: (slug: string) => Promise<void>
}

export const usePeopleStore = create<PersonState>((set) => ({
  personDetail: null,
  isLoadingDetail: false,
  errorDetail: null,

  fetchPersonBySlug: async (slug: string) => {
    try {
      set({ isLoadingDetail: true, errorDetail: null })

      const response = await peopleApi.getBySlug(slug)

      set({
        personDetail: response.data,
        isLoadingDetail: false,
      })
    } catch {
      set({
        errorDetail: 'Error loading person',
        isLoadingDetail: false,
      })
    }
  },
}))
