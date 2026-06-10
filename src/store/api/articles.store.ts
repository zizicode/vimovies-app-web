import { create } from 'zustand'
import type { Article } from '../../types'
import { articlesApi } from '../../lib/api/articles'

interface ArticleState {
  articles: Article[]
  articleDetail: Article | null
  loading: boolean
  isLoadingDetail: boolean
  error: string | null
  isFetched: boolean
  fetchArticles: () => Promise<void>
  refetchArticles: () => Promise<void>
  fetchArticleBySlug: (slug: string) => Promise<void>
}

export const useArticlesStore = create<ArticleState>((set) => ({
  articles: [],
  articleDetail: null,
  loading: false,
  isLoadingDetail: false,
  error: null,
  isFetched: false,
  fetchArticles: async () => {
    // Si ya se intentó cargar, no volvemos a pedir
    const state = useArticlesStore.getState();
    if (state.isFetched) return;

    try {
      set({ loading: true })

      const response = await articlesApi.getAll()

      set({
        articles: response.data.data,
        loading: false,
        isFetched: true,
      })
    } catch {
      set({
        error: 'Error loading articles',
        loading: false,
        isFetched: true,
      })
    }
  },

  refetchArticles: async () => {
    try {
      set({ loading: true })

      const response = await articlesApi.getAll()

      set({
        articles: response.data.data,
        loading: false,
        isFetched: true,
      })
    } catch {
      set({
        error: 'Error loading articles',
        loading: false,
        isFetched: true,
      })
    }
  },

  fetchArticleBySlug: async (slug: string) => {
    try {
      set({ isLoadingDetail: true, error: null })

      const response = await articlesApi.getBySlug(slug)

      set({
        articleDetail: response.data,
        isLoadingDetail: false,
      })
    } catch {
      set({
        error: 'Error loading article',
        isLoadingDetail: false,
      })
    }
  },
}))
