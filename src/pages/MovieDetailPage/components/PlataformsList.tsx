import React from 'react'
import { PLATFORM_NAMES, PLATFORM_GLOW_RGB } from '../../../constants/plataforms'

// Tipo para cada plataforma que viene del API
export interface Platform {
    provider_id: number
    provider_name: string
    logo_path: string
    display_priority: number
}

interface PlataformsListProps {
    title: string
    platforms: Platform[]
}

// Mapeo de nombre de plataforma → clave de constante para el glow
const getPlatformGlow = (name: string): string => {
    const map: Record<string, keyof typeof PLATFORM_GLOW_RGB> = {
        [PLATFORM_NAMES.NETFLIX]: 'NETFLIX',
        [PLATFORM_NAMES.PRIME_VIDEO]: 'PRIME_VIDEO',
        [PLATFORM_NAMES.DISNEY_PLUS]: 'DISNEY_PLUS',
        [PLATFORM_NAMES.MAX]: 'MAX',
        [PLATFORM_NAMES.APPLE_TV]: 'APPLE_TV',
        [PLATFORM_NAMES.PARAMOUNT]: 'PARAMOUNT',
        [PLATFORM_NAMES.STAR_PLUS]: 'STAR_PLUS',
        [PLATFORM_NAMES.MUBI]: 'MUBI',
        [PLATFORM_NAMES.CRUNCHYROLL]: 'CRUNCHYROLL',
        [PLATFORM_NAMES.PLUTO_TV]: 'PLUTO_TV',
    }
    const key = map[name]
    return key ? PLATFORM_GLOW_RGB[key] : '255, 255, 255'
}

const TMDB_LOGO_BASE = 'https://image.tmdb.org/t/p/original'

const PlataformsList: React.FC<PlataformsListProps> = ({ title: _title, platforms }) => {
    if (!platforms || platforms.length === 0) return null

    const sorted = [...platforms].sort((a, b) => a.display_priority - b.display_priority)

    return (
        <div className="container_plataforms">
            <div className="plataforms_inner">
                <h2 className="plataforms_title">
                    {/* Dónde ver <span>{title}</span> */}
                    Dónde puedes ver ahora
                </h2>
                <div className="plataforms_chips">
                    <div className="platform_chip platform_chip--cta">
                        <div className="platform_chip__play">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <span className="platform_chip__name">Ver Ahora</span>
                    </div>

                    <div className="chips_divider" />

                    {sorted.filter(p => p.provider_id !== 0).map((platform) => (
                        <div
                            key={platform.provider_id}
                            className="platform_chip"
                            style={{ '--platform-glow': getPlatformGlow(platform.provider_name) } as React.CSSProperties}
                        >
                            <div className="platform_chip__logo">
                                {platform.logo_path ? (
                                    <img
                                        src={`${TMDB_LOGO_BASE}${platform.logo_path}`}
                                        alt={platform.provider_name}
                                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                                    />
                                ) : (
                                    <span style={{ color: '#fff' }}>{platform.provider_name.charAt(0)}</span>
                                )}
                            </div>
                            <span className="platform_chip__name">{platform.provider_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlataformsList