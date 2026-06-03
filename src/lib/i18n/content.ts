import { useI18n } from '../../store/locate.store.ts'

/**
 * Helper para obtener el valor correcto según el idioma actual
 */
export function useLocalizedContent() {
  const { locale } = useI18n()

  /**
   * Retorna el valor en el idioma correcto
   * @param es - Valor en español
   * @param en - Valor en inglés
   */
  const t = (es: string, en: string): string => {
    return locale === 'en' ? en : es
  }

  /**
   * Obtiene el título localizado de un objeto media
   */
  const getMediaTitle = (media: { title_es?: string; title_en?: string; original_title: string }): string => {
    return t(media.title_es || media.original_title, media.title_en || media.original_title)
  }

  /**
   * Obtiene la sinopsis localizada de un objeto media
   */
  const getMediaSynopsis = (media: { synopsis_es?: string; synopsis_en?: string }): string => {
    return t(media.synopsis_es, media.synopsis_en)
  }

  /**
   * Obtiene el nombre localizado de un género
   */
  const getGenreName = (genre: { name_es: string; name_en: string }): string => {
    return t(genre.name_es, genre.name_en)
  }

  /**
   * Obtiene la descripción localizada de un género
   */
  const getGenreDescription = (genre: { description_es?: string; description_en?: string }): string => {
    return t(genre.description_es || '', genre.description_en || '')
  }

  /**
   * Obtiene el path según el idioma para URLs
   */
  const getPath = (spanishPath: string, englishPath: string): string => {
    return locale === 'en' ? englishPath : spanishPath
  }

  /**
   * Obtiene la ruta de media según el idioma
   */
  const getMediaPath = (media: { media_type: 'movie' | 'tv'; slug: string }): string => {
    const section = locale === 'en' 
      ? (media.media_type === 'movie' ? 'movie' : 'tv-show')
      : (media.media_type === 'movie' ? 'pelicula' : 'serie')
    return `/${section}/${media.slug}`
  }

  return {
    locale,
    t,
    getMediaTitle,
    getMediaSynopsis,
    getGenreName,
    getGenreDescription,
    getPath,
    getMediaPath,
  }
}
