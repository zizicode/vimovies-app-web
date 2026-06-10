import { Link } from 'react-router-dom'
import { useLocale } from '../../../store/locate.store'
import { getPosterUrl } from '../../../utils/image.utils'
import { useGTM } from '../../../hooks/useGTM'
import './MovieCard.scss'

interface MovieCardProps {
  movie: any
  url: string
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, url }) => {
  const locale = useLocale()
  const { trackMovieClick } = useGTM()

  const title = locale === 'en' ? movie.title_en : movie.title_es
  const rating = movie.editorial_rating || 0
  const posterUrl = getPosterUrl(movie.poster_path, 'w342')

  const handleClick = () => {
    trackMovieClick(title, movie.slug)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating / 2)
    const hasHalfStar = rating % 2 >= 1

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="movie-card__star movie-card__star--full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="movie-card__star movie-card__star--half" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${movie.id}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${movie.id})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      } else {
        stars.push(
          <svg key={i} className="movie-card__star movie-card__star--empty" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      }
    }
    return stars
  }

  return (
    <Link to={url} className="movie-card" onClick={handleClick}>
      {/* Poster vertical */}
      <div className="movie-card__poster">
        <img
          src={posterUrl}
          alt={title}
          className="movie-card__poster-img"
          loading="lazy"
        />

        {/* Gradiente con información encima */}
        <div className="movie-card__gradient">
          <div className="movie-card__content">
            {/* Rating */}
            <div className="movie-card__rating">
              <div className="movie-card__stars">
                {renderStars(rating)}
              </div>
              <span className="movie-card__rating-value">{rating.toFixed(1)}</span>
            </div>

            {/* Título */}
            <h3 className="movie-card__title">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
