// 1. Reemplaza 'enum' por objetos con 'as const'
export const ContentStatus = {
    Draft: 'draft',
    Published: 'published',
    Archived: 'archived',
    Scheduled: 'scheduled',
} as const;

// 2. Genera el tipo a partir de los valores del objeto
export type ContentStatus = typeof ContentStatus[keyof typeof ContentStatus];


// 1. Reemplaza 'enum' por objetos con 'as const'
export const MediaType = {
    Movie: 'movie',
    Series: 'series',
    Documentary: 'documentary',
    Short: 'short',
    Special: 'special',
} as const;

// 2. Genera el tipo a partir de los valores del objeto
export type MediaType = typeof MediaType[keyof typeof MediaType];