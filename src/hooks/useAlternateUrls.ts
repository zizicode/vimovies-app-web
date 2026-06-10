const BASE_URL = 'https://vimovies.com'

export function useAlternateUrls() {

  function forMovie(slug: string) {
    return {
      es: `${BASE_URL}/pelicula/${slug}`,
      en: `${BASE_URL}/movie/${slug}`
    }
  }

  function forSeries(slug: string) {
    return {
      es: `${BASE_URL}/serie/${slug}`,
      en: `${BASE_URL}/tv-show/${slug}`
    }
  }

  function forGenre(slugEs: string, slugEn: string) {
    return {
      es: `${BASE_URL}/genero/${slugEs}`,
      en: `${BASE_URL}/genre/${slugEn}`
    }
  }

  function forArticle(slug: string) {
    return {
      es: `${BASE_URL}/articulo/${slug}`,
      en: `${BASE_URL}/article/${slug}`
    }
  }

  function forPerson(slug: string) {
    return {
      es: `${BASE_URL}/actor/${slug}`,
      en: `${BASE_URL}/person/${slug}`
    }
  }

  return { forMovie, forSeries, forGenre, forArticle, forPerson }
}
