import './PersonCard.scss'
import type { Person } from '../../../../lib/api/types'

interface PersonCardProps {
  person: Person
  onClick: () => void
}

export default function PersonCard({ person, onClick }: PersonCardProps) {
  const profileImage = person.profile_path 
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : null

  const popularity = person.popularity || person.tmdb_popularity || 0
  // Normalizar: popularidad máxima de TMDB es ~20, escalar a 0-100
  const popularityPercent = Math.min(Math.round((popularity / 20) * 100), 100)
  
  // Calcular stroke-dasharray para el progreso circular
  const radius = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (popularityPercent / 100) * circumference

  return (
    <button className="person-card" onClick={onClick}>
      <div className="person-card__image">
        {profileImage ? (
          <img src={profileImage} alt={person.name} className="person-card__img" />
        ) : (
          <div className="person-card__placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        )}
      </div>
      <div className="person-card__content">
        <div className="person-card__name-wrapper">
          <h3 className="person-card__name">{person.name}</h3>
          <div className="person-card__popularity-badge" title={`Popularidad: ${popularityPercent}%`}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r={radius}
                fill="none"
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r={radius}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 12 12)"
              />
            </svg>
          </div>
        </div>
        {person.birthdate && (
          <p className="person-card__birthdate">{person.birthdate}</p>
        )}
      </div>
    </button>
  )
}
