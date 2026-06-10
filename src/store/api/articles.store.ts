import { create } from 'zustand'
import type { Article } from '../../types'
import { articlesApi } from '../../lib/api/articles'

interface ArticleState {
  articles: Article[]
  articleDetail: Article | null
  loading: boolean
  isLoadingDetail: boolean
  error: string | null
  fetchArticles: () => Promise<void>
  fetchArticleBySlug: (slug: string) => Promise<void>
}

export const useArticlesStore = create<ArticleState>((set) => ({
  articles: [],
  articleDetail: null,
  loading: false,
  isLoadingDetail: false,
  error: null,
  fetchArticles: async () => {
    // Si ya hay artículos, no volvemos a pedir (o podrías implementar un refresh)
    const currentArticles = useArticlesStore.getState().articles;
    if (currentArticles.length > 0) return;

    try {
      set({ loading: true })

      const response = await articlesApi.getAll()

      set({
        articles: response.data.data,
        loading: false,
      })
    } catch {
      set({
        error: 'Error loading articles',
        loading: false,
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
