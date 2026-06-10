export const endpoints = {
  media: {
    list: '/media',
    search: '/media/search',
    detail: (slug: string) => `/media/${slug}`,
  },

  genres: {
    list: '/genres',
    detail: (slug: string) => `/genres/${slug}`,
  },

  people: {
    search: '/people/search',
    detail: (slug: string) => `/people/${slug}`,
  },

  platforms: {
    list: '/platforms',
    detail: (slug: string) => `/platforms/${slug}`,
  },

  articles: {
    list: '/articles',
    detail: (slug: string) => `/articles/${slug}`,
  },
}