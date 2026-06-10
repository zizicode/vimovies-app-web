import { useState, useEffect } from 'react'
import { useI18n } from '../../store/locate.store'
import { memo } from 'react'
import './GenreFilterControls.scss'

interface GenreFilterControlsProps {
  searchQuery: string
  onSearch: (query: string) => void
  totalResults: number
  showAll?: boolean
}

function GenreFilterControls({ searchQuery, onSearch, totalResults, showAll = false }: GenreFilterControlsProps) {
  const { t } = useI18n()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Auto-submit with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, onSearch])

  const handleClear = () => {
    setLocalQuery('')
  }

  return (
    <div className="genre-filter-controls">
      <div className="genre-filter-controls__form">
        {/* Campo de búsqueda */}
        <div className="genre-filter-controls__search-wrapper">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={showAll ? t('search.placeholder') : t('genre.search.placeholder')}
            className="genre-filter-controls__input"
          />
          <svg
            className="genre-filter-controls__search-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="genre-filter-controls__clear-btn"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Contador de resultados */}
        {totalResults > 0 && (
          <div className="genre-filter-controls__results-count">
            {totalResults}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(GenreFilterControls)
