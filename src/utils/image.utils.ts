const IMAGE_BASE_URL =
   'https://image.tmdb.org'

const FALLBACK_POSTER =
  '/images/poster-placeholder.webp'

export const getPosterUrl = (
  path?: string | null,
  size = 'w185'
) => {
  if (!path) return FALLBACK_POSTER

  return `${IMAGE_BASE_URL}/t/p/${size}/${path}`
}

export const getBackdropUrl = (
  path?: string | null,
  size = 'w780'
) => {
  if (!path) return FALLBACK_POSTER

  return `${IMAGE_BASE_URL}/t/p/${size}/${path}`
}

export const getProfileUrl = (
  path?: string | null,
  size = 'w185'
) => {
  if (!path) return null

  return `${IMAGE_BASE_URL}/t/p/${size}/${path}`
}

/**
 * Genera un srcset para imágenes de TMDB para mejorar el rendimiento (Responsive Images)
 */
export const getPosterSrcSet = (path?: string | null) => {
  if (!path) return undefined

  const sizes = [185, 342, 500]
  return sizes
    .map(size => `${IMAGE_BASE_URL}/t/p/w${size}/${path} ${size}w`)
    .join(', ')
}

/**
 * Genera un srcset para backdrops de TMDB (Imágenes horizontales)
 */
export const getBackdropSrcSet = (path?: string | null) => {
  if (!path) return undefined

  const sizes = [780, 1280]
  return sizes
    .map(size => `${IMAGE_BASE_URL}/t/p/w${size}/${path} ${size}w`)
    .join(', ')
}

/**
 * Convierte minutos a formato ISO 8601 de duración (PT2H15M)
 */
export const minutesToISO8601Duration = (minutes?: number | null): string | undefined => {
  if (!minutes) return undefined

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) {
    return `PT${mins}M`
  }

  if (mins === 0) {
    return `PT${hours}H`
  }

  return `PT${hours}H${mins}M`
}