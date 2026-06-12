import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../store/locate.store';
import Store from '../../store';
import { MOCK_ARTICLES } from '../../mocks/RecentArticles.mocks';
import { useGTM } from '../../hooks/useGTM';
import type { Article } from '../../lib/api/types';
import './RecentArticles.scss';

const RecentArticles: React.FC = () => {
  const { locale } = useI18n();
  const apiArticles = Store.useArticlesStore((state) => state.articles);
  const loading = Store.useArticlesStore((state) => state.loading);
  const { trackArticleClick, trackNavigation } = useGTM();

  const getArticlesUrl = () => {
    return locale === 'en' ? '/articles' : '/articulos';
  };

  const getArticleUrl = (slug: string) => {
    return locale === 'en' ? `/article/${slug}` : `/articulo/${slug}`;
  };

  const handleArticleClick = (article: Article) => {
    const title = locale === 'en' ? article.title_en : article.title_es;
    trackArticleClick(title ?? "No disponible", article.slug);
  };

  const handleViewMoreClick = () => {
    trackNavigation('articles_list', 'Ver más artículos');
  };

  // Usamos los mocks si la API no devuelve nada, y limitamos a los 3 últimos
  const allArticles = (apiArticles && apiArticles.length > 0) ? apiArticles : MOCK_ARTICLES;
  const articles = allArticles
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 3);

  if (loading && (!apiArticles || apiArticles.length === 0)) {
    return (
      <section className="recent-articles">
        <div className="recent-articles__container">
          <p className="recent-articles__subtitle">Editorial</p>
          <div className="recent-articles__header">
            <h1>Artículos Recientes</h1>
          </div>
          <div className="recent-articles__grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="article-card-skeleton" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="recent-articles">
      <div className="recent-articles__container">
        <header className="recent-articles__header">
          <p className="recent-articles__subtitle">Editorial</p>
          <h1 className="recent-articles__title">Artículos Recientes</h1>
        </header>

        <div className="recent-articles__grid">
          {articles.map((article) => {
            const title = locale === 'en' ? article.title_en : article.title_es;
            const excerpt = locale === 'en' ? article.excerpt_en : article.excerpt_es;
            const category = article.article_categories?.name_es || 'General';
            
            return (
              <Link
                to={getArticleUrl(article.slug)}
                className="article-card"
                key={article.id}
                onClick={() => handleArticleClick(article)}
              >
                <div className="article-card__image-wrap">
                  <img
                    src={article.cover_image_url || '/images/article-placeholder.webp'}
                    alt={title || ''}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="article-card__badge">{category}</div>
                  <div className="article-card__overlay" />
                </div>

                <div className="article-card__body">
                  <div className="article-card__meta">
                    {new Date(article.published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
                      day: 'numeric',
                      month: 'long'
                    })}
                    <span className="separator">•</span>
                    {article.reading_time_minutes || 5} min
                  </div>
                  <h3 className="article-card__title">{title}</h3>
                  <p className="article-card__excerpt">{excerpt}</p>

                  <div className="article-card__footer">
                    <span className="article-card__read-more">
                      Leer artículo <span className="arrow">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="recent-articles__footer">
          <Link to={getArticlesUrl()} className="recent-articles__view-all" onClick={handleViewMoreClick}>
            Ver más artículos
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default RecentArticles;
