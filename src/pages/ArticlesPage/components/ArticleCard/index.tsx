import { Link } from 'react-router-dom'
import { useLocale } from '../../../../store/locate.store'
import { useGTM } from '../../../../hooks/useGTM'
import type { Article } from '../../../../lib/api/types'
import './ArticleCard.scss'

interface ArticleTag {
  name_en: string
  name_es: string
}

interface ArticleCardProps {
  article: Article
  url: string
}

export default function ArticleCard({ article, url }: ArticleCardProps) {
  const locale = useLocale()
  const { trackArticleClick } = useGTM()

  const title = locale === 'en' ? article.title_en || article.title_es : article.title_es
  const excerpt = locale === 'en' ? article.excerpt_en || article.excerpt_es : article.excerpt_es
  const coverImage = article.cover_image_url || '/placeholder-article.jpg'
  const publishedAt = article.published_at ? new Date(article.published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null

  const handleClick = () => {
    trackArticleClick(title, article.slug)
  }

  return (
    <Link to={url} className="article-card" onClick={handleClick}>
      <div className="article-card__image">
        {coverImage && (
          <img 
            src={coverImage} 
            alt={title}
            className="article-card__image-img"
            loading="lazy"
          />
        )}
        <div className="article-card__gradient"></div>
      </div>
      
      <div className="article-card__content">
        {article.tags && article.tags.length > 0 && (
          <div className="article-card__tags">
            {article.tags.slice(0, 3).map((tag: ArticleTag, index: number) => (
              <span key={index} className="article-card__tag">
                {locale === 'en' ? tag.name_en : tag.name_es}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="article-card__title">{title}</h3>
        
        {excerpt && (
          <p className="article-card__excerpt">{excerpt}</p>
        )}
        
        {publishedAt && (
          <div className="article-card__meta">
            <svg className="article-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>{publishedAt}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
