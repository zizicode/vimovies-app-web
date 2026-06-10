import { useState } from 'react'
import type { Media } from '../../../lib/api/types'
import TrailerModal from './TrailerModal'

interface TrailersTabProps {
  movie: Media
}

export default function TrailersTab({ movie }: TrailersTabProps) {
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null)
  
  const trailers = movie.videos?.filter(v => v.video_site === 'youtube' && (v.video_type === 'trailer' || v.video_type === 'teaser')) ?? []

  const handleTrailerClick = (key: string) => {
    setSelectedTrailer(key)
  }

  const handleCloseModal = () => {
    setSelectedTrailer(null)
  }

  if (trailers.length === 0) {
    return (
      <div className="trailers-tab">
        <div className="trailers-tab__empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
          <p className="trailers-tab__empty-text">
            No hay tráilers disponibles para esta película.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="trailers-tab" id="trailers-section">
  <div className="trailers-tab__grid">
    {trailers.map((video) => (
      <div
        key={video.external_key}
        className="trailers-tab__card"
        onClick={() => handleTrailerClick(video.external_key)}
      >
        <div className="trailers-tab__thumbnail">
          <img
            src={`https://img.youtube.com/vi/${video.external_key}/hqdefault.jpg`}
            alt={video.title}
            className="trailers-tab__thumbnail-img"
          />
          {/* badge tipo — arriba a la izquierda sobre la imagen */}
          <span className="trailers-tab__card-type">{video.video_type}</span>

          <div className="trailers-tab__play-overlay">
            <div className="trailers-tab__play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="trailers-tab__card-body">
          <h4 className="trailers-tab__card-title">{video.title}</h4>
          {/* card-type ya no va aquí */}
        </div>
      </div>
    ))}
  </div>

      {selectedTrailer && (
        <TrailerModal videoKey={selectedTrailer} onClose={handleCloseModal} />
      )}
    </div>
  )
}
