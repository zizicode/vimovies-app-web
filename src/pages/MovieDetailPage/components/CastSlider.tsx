import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Media } from '../../../lib/api/types'
import { getProfileUrl } from '../../../utils/image.utils'
import { useLocale, useT } from '../../../store/locate.store'

interface CastSliderProps {
  movie: Media
}

export default function CastSlider({ movie }: CastSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const locale = useLocale()
  const t = useT()
  const isEnglish = locale === 'en'

  const credits = movie.credits?.slice(0, 20) ?? []

  useEffect(() => {
    const checkScroll = () => {
      if (trackRef.current) {
        setCanScrollLeft(trackRef.current.scrollLeft > 0)
        setCanScrollRight(
          trackRef.current.scrollLeft <
          trackRef.current.scrollWidth - trackRef.current.clientWidth
        )
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [credits])

  const scroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = 300
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const getPersonPath = (slug: string) => {
    return isEnglish ? `/person/${slug}` : `/actor/${slug}`
  }

  // const getInitials = (name: string) => {
  //   if (!name) return '??'
  //   return name
  //     .split(' ')
  //     .map(n => n[0])
  //     .join('')
  //     .toUpperCase()
  //     .slice(0, 2)
  // }

  if (credits.length === 0) {
    return (
      <div className="cast-slider">
        <div className="cast-slider__container">
          <h2 className="cast-slider__title">{t('components.castSlider.cast')}</h2>
          <p className="cast-slider__empty">{t('components.castSlider.noCastInfo')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cast-slider">
      <div className="cast-slider__container">

        <div className="cast-slider__header">
          <h2 className="cast-slider__title">
            {t('components.castSlider.cast')} <span>{t('components.castSlider.main')}</span>
          </h2>
          <div className="cast-slider__controls">
            <button
              className={`cast-slider__btn ${!canScrollLeft ? 'cast-slider__btn--disabled' : ''}`}
              onClick={() => scroll('left')}
              aria-label={t('components.castSlider.previous')}
            >
              <i className="ti ti-chevron-left" style={{ fontSize: 16 }} aria-hidden="true" />
            </button>
            <button
              className={`cast-slider__btn ${!canScrollRight ? 'cast-slider__btn--disabled' : ''}`}
              onClick={() => scroll('right')}
              aria-label={t('components.castSlider.next')}
            >
              <i className="ti ti-chevron-right" style={{ fontSize: 16 }} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="cast-slider__slider">
          <div className="cast-slider__track" ref={trackRef}>
            {credits.map((credit) => {
              const personName = credit.person?.name || credit.name || ''
              const profilePath = credit.person?.profile_path || credit.profile_path
              const initial = personName.trim().charAt(0).toUpperCase()
              const personSlug = credit.person?.slug

              const cardContent = (
                <>
                  <div className="cast-slider__photo">
                    {profilePath ? (
                      <img
                        src={getProfileUrl(profilePath, 'w185')}
                        alt={personName}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const avatar = e.currentTarget.nextElementSibling as HTMLElement
                          if (avatar) avatar.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div
                      className="cast-slider__avatar"
                      style={{ display: profilePath ? 'none' : 'flex' }}
                    >
                      {initial}
                    </div>
                    <div className="cast-slider__overlay" />
                  </div>
                  <div className="cast-slider__info">
                    <p className="cast-slider__name">{personName}</p>
                    {(credit.character || credit.character_name) && (
                      <p className="cast-slider__character">
                        {credit.character || credit.character_name}
                      </p>
                    )}
                  </div>
                </>
              )

              if (personSlug) {
                return (
                  <Link
                    key={credit.id}
                    to={getPersonPath(personSlug)}
                    className="cast-slider__card cast-slider__card--link"
                  >
                    {cardContent}
                  </Link>
                )
              }

              return (
                <div key={credit.id} className="cast-slider__card">
                  {cardContent}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
