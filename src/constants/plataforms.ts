export const PLATFORM_NAMES = {
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

export type PlatformKey = keyof typeof PLATFORM_NAMES