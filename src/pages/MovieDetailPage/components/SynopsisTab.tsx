import type { Media } from '../../../lib/api/types'

interface SynopsisTabProps {
  movie: Media
  isEnglish: boolean
}

export default function SynopsisTab({ movie, isEnglish }: SynopsisTabProps) {
  const synopsis = isEnglish ? movie.synopsis_en : movie.synopsis_es

  if (!synopsis) {
    return (
      <div className="synopsis-tab">
        <p className="synopsis-tab__empty">No hay sinopsis disponible.</p>
      </div>
    )
  }

  return (
    <div className="synopsis-tab">
      <p className="synopsis-tab__text">{synopsis}</p>
    </div>
  )
}
