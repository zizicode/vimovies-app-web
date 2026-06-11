import { useEffect, useState, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useAlternateUrls } from '../../hooks/useAlternateUrls'
import { useLocale } from '../../store/locate.store'
import type { Article } from '../../lib/api/types'
import { mockArticleDetail } from '../ArticlesPage/mock-articles'
import MovieCard from '../MoviesPage/components/MovieCard'
import './ArticleDetailPage.scss'

interface ArticleTag {
  name_en: string
  name_es: string
}

interface ArticleFAQ {
  question_en: string
  question_es: string
  answer_en: string
  answer_es: string
}

interface ArticleMention {
  movie_slug: string
  movie_title_en: string
  movie_title_es: string
}

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const locale = useLocale()
  const { pathname } = useLocation()
  const { forArticle } = useAlternateUrls()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isEnglishRoute = pathname.startsWith('/article/')
  const isEnglish = locale === 'en'
  const currentLocale = isEnglish ? 'en_US' : 'es_ES'

  const loadArticle = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Usar mock para desarrollo
      setTimeout(() => {
        setArticle(mockArticleDetail as Article)
        setLoading(false)
      }, 500)

      // Descomentar para usar API real
      /*
      const response = await articlesApi.getBySlug(slug)
      if (response.success && response.data) {
        setArticle(response.data)
      } else {
        setError(isEnglish ? 'Article not found' : 'Artículo no encontrado')
      }
      */
    } catch (err) {
      console.error('Error loading article:', err)
      setError(isEnglish ? 'Error loading article' : 'Error al cargar el artículo')
      setLoading(false)
    }
  }, [isEnglish])

  useEffect(() => {
    if (slug) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadArticle()
    }
  }, [slug, loadArticle])

  const getMovieUrl = (movieSlug: string) => {
    return locale === 'en' ? `/movie/${movieSlug}` : `/pelicula/${movieSlug}`
  }

  return (
    <div className="article-detail-page">
      {loading && (
        <div className="article-detail-page__loading">
          <div className="article-detail-page__spinner"></div>
        </div>
      )}

      {!loading && error && (
        <div className="article-detail-page__error">
          <p>{error}</p>
          <button onClick={loadArticle} className="article-detail-page__retry-btn">
            {isEnglish ? 'Retry' : 'Reintentar'}
          </button>
        </div>
      )}

      {!loading && !article && !error && (
        <div className="article-detail-page__not-found">
          <p>{isEnglish ? 'Article not found' : 'Artículo no encontrado'}</p>
        </div>
      )}

      {article && (
        <>
          <SEO
            title={`${isEnglish ? article.title_en || article.title_es : article.title_es} - Vimovies`}
            description={isEnglish ? article.excerpt_en || article.excerpt_es : article.excerpt_es}
            canonical={isEnglishRoute ? `https://vimovies.com/article/${article.slug}` : `https://vimovies.com/articulo/${article.slug}`}
            type="article"
            locale={currentLocale}
            alternates={forArticle(article.slug)}
            jsonLd={{
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: isEnglish ? article.title_en || article.title_es : article.title_es,
              url: isEnglishRoute ? `https://vimovies.com/article/${article.slug}` : `https://vimovies.com/articulo/${article.slug}`,
              image: article.cover_image_url || 'https://vimovies.com/logos/vimovies_logo_512.png',
              datePublished: article.published_at,
              dateModified: article.updated_at || article.published_at,
              description: isEnglish ? article.excerpt_en || article.excerpt_es : article.excerpt_es,
              author: {
                '@type': 'Person',
                name: 'ViMovies Editorial'
              },
              publisher: {
                '@type': 'Organization',
                name: 'ViMovies',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://vimovies.com/logos/vimovies_logo_512.png'
                }
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': isEnglishRoute ? `https://vimovies.com/article/${article.slug}` : `https://vimovies.com/articulo/${article.slug}`
              }
            }}
          />

          {/* Hero con imagen de portada */}
          {article.cover_image_url && (
            <div className="article-detail-page__hero">
              <div className="article-detail-page__hero-image">
                <img src={article.cover_image_url} alt={isEnglish ? article.title_en || article.title_es : article.title_es} />
                <div className="article-detail-page__hero-overlay"></div>
              </div>
              <div className="article-detail-page__container">
                <div className="article-detail-page__hero-content">
                  {article.tags && article.tags.length > 0 && (
                    <div className="article-detail-page__tags">
                      {article.tags.map((tag: ArticleTag, index: number) => (
                        <span key={index} className="article-detail-page__tag">
                          {isEnglish ? tag.name_en : tag.name_es}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="article-detail-page__title">
                    {isEnglish ? article.title_en || article.title_es : article.title_es}
                  </h1>
                  {article.published_at && (
                    <div className="article-detail-page__meta">
                      <svg className="article-detail-page__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>
                        {new Date(article.published_at).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contenido del artículo */}
          <div className="article-detail-page__main">
            <div className="article-detail-page__container">
              <div className="article-detail-page__layout">
                <article className="article-detail-page__content">
                  {!article.cover_image_url && (
                    <>
                      {article.tags && article.tags.length > 0 && (
                        <div className="article-detail-page__tags">
                          {article.tags.map((tag: ArticleTag, index: number) => (
                            <span key={index} className="article-detail-page__tag">
                              {isEnglish ? tag.name_en : tag.name_es}
                            </span>
                          ))}
                        </div>
                      )}
                      <h1 className="article-detail-page__title">
                        {isEnglish ? article.title_en || article.title_es : article.title_es}
                      </h1>
                      {article.published_at && (
                        <div className="article-detail-page__meta">
                          <svg className="article-detail-page__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          <span>
                            {new Date(article.published_at).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {article.excerpt_es && (
                    <p className="article-detail-page__excerpt">
                      {isEnglish ? article.excerpt_en || article.excerpt_es : article.excerpt_es}
                    </p>
                  )}

                  <div
                    className="article-detail-page__body"
                    dangerouslySetInnerHTML={{
                      __html: isEnglish ? article.content_en || article.content_es : article.content_es
                    }}
                  />

                  {/* FAQs */}
                  {article.faqs && article.faqs.length > 0 && (
                    <div className="article-detail-page__faqs">
                      <h2 className="article-detail-page__section-title">
                        {isEnglish ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
                      </h2>
                      <div className="article-detail-page__faqs-list">
                        {article.faqs.map((faq: ArticleFAQ, i: number) => (
                          <div key={i} className="article-detail-page__faq">
                            <h3 className="article-detail-page__faq-question">
                              {isEnglish ? faq.question_en || faq.question_es : faq.question_es}
                            </h3>
                            <p className="article-detail-page__faq-answer">
                              {isEnglish ? faq.answer_en || faq.answer_es : faq.answer_es}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>

                {/* Sidebar con películas mencionadas */}
                {article.mentions && article.mentions.length > 0 && (
                  <aside className="article-detail-page__sidebar">
                    <div className="article-detail-page__sidebar-section">
                      <h3 className="article-detail-page__sidebar-title">
                        {isEnglish ? 'Movies Mentioned' : 'Películas Mencionadas'}
                      </h3>
                      <div className="article-detail-page__mentioned-movies">
                        {article.mentions.map((mention: ArticleMention, index: number) => (
                          mention.media && (
                            <MovieCard
                              key={index}
                              movie={mention.media}
                              url={getMovieUrl(mention.media.slug)}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  </aside>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
