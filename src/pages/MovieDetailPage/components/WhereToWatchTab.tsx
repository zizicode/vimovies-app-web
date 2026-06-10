import type { Media } from '../../../lib/api/types'

interface WhereToWatchTabProps {
  movie: Media
}

export default function WhereToWatchTab({ movie }: WhereToWatchTabProps) {
  const streamingProviders = movie.watch_providers?.filter(p => p.is_streaming) ?? []
  const rentProviders = movie.watch_providers?.filter(p => p.is_rent) ?? []
  const buyProviders = movie.watch_providers?.filter(p => p.is_buy) ?? []

  const hasProviders = streamingProviders.length > 0 || rentProviders.length > 0 || buyProviders.length > 0

  if (!hasProviders) {
    return (
      <div className="where-to-watch">
        <div className="where-to-watch__empty">
          <p className="where-to-watch__empty-text">
            No hay información de plataformas disponibles para esta película.
          </p>
          <div className="where-to-watch__empty-links">
            <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer">Netflix</a>
            <a href="https://www.amazon.com/primevideo" target="_blank" rel="noopener noreferrer">Prime Video</a>
            <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer">Disney+</a>
            <a href="https://www.hulu.com" target="_blank" rel="noopener noreferrer">Hulu</a>
            <a href="https://www.hbomax.com" target="_blank" rel="noopener noreferrer">HBO Max</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="where-to-watch">
      {streamingProviders.length > 0 && (
        <div className="where-to-watch__group">
          <h4 className="where-to-watch__label">Streaming</h4>
          <div className="where-to-watch__grid">
            {streamingProviders.map((provider) => (
              <a
                key={provider.id}
                href={provider.watch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="where-to-watch__tile"
              >
                <span className="where-to-watch__logo">
                  {String(provider.platform_id)?.charAt(0).toUpperCase() || 'P'}
                </span>
                <span className="where-to-watch__name">
                  Platform {provider.platform_id}
                </span>
                {provider.quality && (
                  <span className={`where-to-watch__quality-badge where-to-watch__quality-badge--included`}>
                    {provider.quality}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {rentProviders.length > 0 && (
        <div className="where-to-watch__group">
          <h4 className="where-to-watch__label">Alquiler</h4>
          <div className="where-to-watch__grid">
            {rentProviders.map((provider) => (
              <a
                key={provider.id}
                href={provider.watch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="where-to-watch__tile"
              >
                <span className="where-to-watch__logo">
                  {String(provider.platform_id)?.charAt(0).toUpperCase() || 'P'}
                </span>
                <span className="where-to-watch__name">
                  Platform {provider.platform_id}
                </span>
                {provider.rent_price_usd && (
                  <span className="where-to-watch__price">
                    ${provider.rent_price_usd.toFixed(2)}
                  </span>
                )}
                {provider.quality && (
                  <span className={`where-to-watch__quality-badge where-to-watch__quality-badge--rental`}>
                    {provider.quality}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {buyProviders.length > 0 && (
        <div className="where-to-watch__group">
          <h4 className="where-to-watch__label">Compra</h4>
          <div className="where-to-watch__grid">
            {buyProviders.map((provider) => (
              <a
                key={provider.id}
                href={provider.watch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="where-to-watch__tile"
              >
                <span className="where-to-watch__logo">
                  {String(provider.platform_id)?.charAt(0).toUpperCase() || 'P'}
                </span>
                <span className="where-to-watch__name">
                  Platform {provider.platform_id}
                </span>
                {provider.buy_price_usd && (
                  <span className="where-to-watch__price">
                    ${provider.buy_price_usd.toFixed(2)}
                  </span>
                )}
                {provider.quality && (
                  <span className={`where-to-watch__quality-badge where-to-watch__quality-badge--rental`}>
                    {provider.quality}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
