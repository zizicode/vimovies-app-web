import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface TrailerModalProps {
  videoKey: string
  onClose: () => void
}

export default function TrailerModal({ videoKey, onClose }: TrailerModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div className="trailer-modal" onClick={onClose}>
      <div className="trailer-modal__overlay" />
      <div
        className="trailer-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="trailer-modal__close"
          onClick={onClose}
          aria-label="Cerrar tráiler"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="trailer-modal__video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title="Tráiler"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  )
}