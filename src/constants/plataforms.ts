export const PLATFORM_NAMES = {
  EXT:          'Ver Ahora',
  NETFLIX:      'Netflix',
  PRIME_VIDEO:  'Prime Video',
  DISNEY_PLUS:  'Disney+',
  MAX:          'Max',
  APPLE_TV:     'Apple TV+',
  PARAMOUNT:    'Paramount+',
  STAR_PLUS:    'Star+',
  MUBI:         'MUBI',
  CRUNCHYROLL:  'Crunchyroll',
  PLUTO_TV:     'Pluto TV',
} as const

// Glow RGB para box-shadow hover sobre fondo oscuro
export const PLATFORM_GLOW_RGB = {
  EXT:          '149, 15, 245',
  NETFLIX:      '229, 9, 20',
  PRIME_VIDEO:  '0, 168, 224',
  DISNEY_PLUS:  '0, 99, 229',
  MAX:          '75, 71, 255',
  APPLE_TV:     '255, 255, 255',
  PARAMOUNT:    '0, 100, 255',
  STAR_PLUS:    '74, 47, 191',
  MUBI:         '255, 255, 255',
  CRUNCHYROLL:  '244, 117, 33',
  PLUTO_TV:     '255, 204, 0',
} as const

export const PLATFORM_LOGOS = {
  EXT: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E`,

  NETFLIX: `https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg`,

  PRIME_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg`,

  DISNEY_PLUS: `https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg`,

  MAX: `https://upload.wikimedia.org/wikipedia/commons/5/5a/Max_logo.svg`,

  APPLE_TV: `https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg`,

  PARAMOUNT: `https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus_logo.svg`,

  STAR_PLUS: `https://upload.wikimedia.org/wikipedia/commons/c/ca/Star_Plus_logo.svg`,

  MUBI: `https://upload.wikimedia.org/wikipedia/commons/b/b3/MUBI_logo.svg`,

  CRUNCHYROLL: `https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.svg`,

  PLUTO_TV: `https://upload.wikimedia.org/wikipedia/commons/f/fb/Pluto_TV_logo.svg`,
} as const

export type PlatformKey = keyof typeof PLATFORM_NAMES