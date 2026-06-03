import { useEffect, useState } from 'react'
import './MaintenancePage.scss'
import logoImage from '/favicon.svg'


interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const TARGET_DATE = new Date('2026-07-01T00:00:00')

function getTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: 'Días',     value: timeLeft.days },
    { label: 'Horas',    value: timeLeft.hours },
    { label: 'Minutos',  value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ]

  return (
    <div className="maintenance-page">

      {/* Fondo decorativo */}
      <div className="maintenance-page__bg" aria-hidden="true">
        <div className="maintenance-page__bg-orb maintenance-page__bg-orb--1" />
        <div className="maintenance-page__bg-orb maintenance-page__bg-orb--2" />
        <div className="maintenance-page__bg-grid" />
      </div>

      <main className="maintenance-page__content">

        {/* Logo */}
        <div className="maintenance-page__logo">
          <img src={logoImage} alt="VIMovies Logo" className="maintenance-page__logo-image" />
        </div>

        {/* Pill badge */}
        <div className="maintenance-page__badge">
          <span className="maintenance-page__badge-dot" />
          En construcción
        </div>

        {/* Título principal */}
        <h1 className="maintenance-page__title">
          Estamos preparando<br />algo especial
        </h1>

        {/* Párrafo SEO */}
        <p className="maintenance-page__description">
          vimovies será tu destino definitivo para descubrir cine: accede a trailers exclusivos,
          sinopsis detalladas, reseñas editoriales y toda la información de tus películas favoritas,
          incluyendo dónde verlas online. Un catálogo curado, diseñado para los que viven el cine.
        </p>

        {/* Contador */}
        <div className="maintenance-page__countdown" aria-label="Cuenta regresiva al lanzamiento">
          {units.map(({ label, value }) => (
            <div key={label} className="maintenance-page__countdown-unit">
              <div className="maintenance-page__countdown-box">
                <span className="maintenance-page__countdown-number">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <span className="maintenance-page__countdown-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Separadores entre unidades */}
        <p className="maintenance-page__footer">
          Muy pronto · <span>vimovies.com</span>
        </p>

      </main>
    </div>
  )
}
