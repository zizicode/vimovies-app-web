import React, { useState, useEffect } from 'react'
import { PLATFORM_GLOW_RGB, PLATFORM_LOGOS } from '../../../constants/plataforms'
import type { WatchProvider, WatchPlatform } from '../../../lib/api/types'
import './PlataformsList.scss'

interface PlataformsListProps {
  watch_providers?: WatchProvider[]
  locale: 'es' | 'en'
}

const PROVIDER_WEIGHT = (p: WatchProvider): number => {
  if (p.is_streaming) return 0
  if (p.is_rent) return 1
  if (p.is_buy) return 2
  return 3
}

const getPlatformGlow = (slug: string): string => {
  const map: Record<string, keyof typeof PLATFORM_GLOW_RGB> = {
    'ext': 'EXT',
    'netflix': 'NETFLIX',
    'prime-video': 'PRIME_VIDEO',
    'disney-plus': 'DISNEY_PLUS',
    'max': 'MAX',
    'apple-tv': 'APPLE_TV',
    'paramount': 'PARAMOUNT',
    'star-plus': 'STAR_PLUS',
    'mubi': 'MUBI',
    'crunchyroll': 'CRUNCHYROLL',
    'pluto-tv': 'PLUTO_TV',
  }
  return PLATFORM_GLOW_RGB[map[slug]] ?? '255, 255, 255'
}

const getPlatformLogo = (slug: string): string | null => {
  const map: Record<string, keyof typeof PLATFORM_LOGOS> = {
    'ext': 'EXT',
    'netflix': 'NETFLIX',
    'prime-video': 'PRIME_VIDEO',
    'disney-plus': 'DISNEY_PLUS',
    'max': 'MAX',
    'apple-tv': 'APPLE_TV',
    'paramount': 'PARAMOUNT',
    'star-plus': 'STAR_PLUS',
    'mubi': 'MUBI',
    'crunchyroll': 'CRUNCHYROLL',
    'pluto-tv': 'PLUTO_TV',
  }
  return PLATFORM_LOGOS[map[slug]] ?? null
}

const resolveUrl = (provider: WatchProvider, locale: 'es' | 'en'): string =>
  provider.affiliate_url ??
  (locale === 'es' ? provider.platform.affiliate_url_es : provider.platform.affiliate_url_en) ??
  provider.watch_url ??
  '#'

const resolveName = (platform: WatchPlatform, locale: 'es' | 'en'): string =>
  locale === 'es' ? platform.name_es : platform.name_en

// Custom dropdown component - simple y estable
const CustomDropdown: React.FC<{
  platform: WatchPlatform
  providers: WatchProvider[]
  locale: 'es' | 'en'
}> = ({ platform, providers, locale }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.platform_chip--select')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const handleProviderClick = (provider: WatchProvider) => {
    window.open(resolveUrl(provider, locale), '_blank')
    setIsOpen(false)
  }

  return (
    <div 
      className="platform_chip platform_chip--select" 
      style={{ '--platform-glow': getPlatformGlow(platform.slug) } as React.CSSProperties}
    >
      <div className="platform_chip__logo">
        {getPlatformLogo(platform.slug) || platform.logo_url ? (
          <img
            src={getPlatformLogo(platform.slug) || platform.logo_url!}
            alt={resolveName(platform, locale)}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <span style={{ color: '#fff' }}>
            {resolveName(platform, locale).charAt(0)}
          </span>
        )}
      </div>

      <button
        className="platform_chip__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        <span className="platform_chip__name">
          {resolveName(platform, locale)}
        </span>
        <div className={`platform_chip__chevron ${isOpen ? 'platform_chip__chevron--open' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="platform_chip__dropdown" role="listbox">
          {providers.map((provider) => (
            <button
              key={provider.id}
              className="platform_chip__option"
              onClick={() => handleProviderClick(provider)}
              role="option"
            >
              <div className="platform_chip__option-logo">
                {getPlatformLogo(platform.slug) || platform.logo_url ? (
                  <img
                    src={getPlatformLogo(platform.slug) || platform.logo_url!}
                    alt={resolveName(platform, locale)}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                ) : (
                  <span style={{ color: '#fff' }}>
                    {resolveName(platform, locale).charAt(0)}
                  </span>
                )}
              </div>
              <span className="platform_chip__option-name">
                {provider.region_code} - {provider.is_streaming ? 'Streaming' : provider.is_rent ? 'Rent' : 'Buy'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const PlataformsList: React.FC<PlataformsListProps> = ({ watch_providers = [], locale }) => {
  const sorted = watch_providers
    .filter((p): p is WatchProvider & { platform: WatchPlatform } => Boolean(p.platform))
    .sort((a, b) => PROVIDER_WEIGHT(a) - PROVIDER_WEIGHT(b))

  if (sorted.length === 0) {
    return (
      <div className="container_plataforms">
        <div className="plataforms_inner">
          <h2 className="plataforms_title">
            {locale === 'es' ? 'Dónde puedes ver ahora' : 'Where to watch now'}
          </h2>
          <div className="plataforms_chips">
            <div className="platform_chip" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
              <div className="platform_chip__play">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="platform_chip__name">
                {locale === 'es' ? 'Sin plataformas para ver' : 'No platforms available'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Agrupar providers por plataforma
  const providersByPlatform = sorted.reduce((acc, provider) => {
    const platformSlug = provider.platform.slug
    if (!acc[platformSlug]) {
      acc[platformSlug] = []
    }
    acc[platformSlug].push(provider)
    return acc
  }, {} as Record<string, WatchProvider[]>)

  // Buscar provider externo (slug 'Ext')
  const externalProvider = sorted.find(p => p.platform.slug === 'Ext')
  const otherPlatforms = Object.entries(providersByPlatform).filter(([slug]) => slug !== 'Ext')

  // Función para renderizar un select de opciones
  const renderPlatformSelect = (providers: WatchProvider[]) => {
    const platform = providers[0].platform
    const hasMultipleOptions = providers.length > 1

    if (!hasMultipleOptions) {
      // Solo una opción, renderizar como botón normal
      return (
        <a
          href={resolveUrl(providers[0], locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="platform_chip"
          style={{ '--platform-glow': getPlatformGlow(platform.slug) } as React.CSSProperties}
        >
          <div className="platform_chip__logo">
            {getPlatformLogo(platform.slug) || platform.logo_url ? (
              <img
                src={getPlatformLogo(platform.slug) || platform.logo_url!}
                alt={resolveName(platform, locale)}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            ) : (
              <span style={{ color: '#fff' }}>
                {resolveName(platform, locale).charAt(0)}
              </span>
            )}
          </div>
          <span className="platform_chip__name">
            {resolveName(platform, locale)}
          </span>
        </a>
      )
    }

    // Múltiples opciones, renderizar como dropdown custom
    return <CustomDropdown platform={platform} providers={providers} locale={locale} />
  }

  return (
    <div className="container_plataforms">
      <div className="plataforms_inner">
        <h2 className="plataforms_title">
          {locale === 'es' ? 'Dónde puedes ver ahora' : 'Where to watch now'}
        </h2>

        <div className="plataforms_chips">
          {/* Botón Ext (siempre primero) */}
          {externalProvider && (
            <a
              href={resolveUrl(externalProvider, locale)}
              target="_blank"
              rel="noopener noreferrer"
              id={`platform-${externalProvider.platform.slug}`}
              className="platform_chip platform_chip--cta platform_chip--ext"
              style={{ '--platform-glow': getPlatformGlow(externalProvider.platform.slug) } as React.CSSProperties}
            >
              {getPlatformLogo(externalProvider.platform.slug) || externalProvider.platform.logo_url ? (
                <div className="platform_chip__logo">
                  <img
                    src={getPlatformLogo(externalProvider.platform.slug) || externalProvider.platform.logo_url!}
                    alt={resolveName(externalProvider.platform, locale)}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
              ) : (
                <div className="platform_chip__play">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
              <span className="platform_chip__name">
                {resolveName(externalProvider.platform, locale)}
              </span>
            </a>
          )}

          {/* Divider si hay Ext y otras plataformas */}
          {externalProvider && otherPlatforms.length > 0 && (
            <div className="chips_divider" />
          )}

          {/* Otras plataformas */}
          {otherPlatforms.map(([platformSlug, providers]) => (
            <React.Fragment key={platformSlug}>
              {renderPlatformSelect(providers)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlataformsList