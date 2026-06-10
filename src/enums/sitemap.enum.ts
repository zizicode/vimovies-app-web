// 1. Definición del objeto como valor real en JavaScript
export const SitemapPriority = {
    Critical: 'critical', // 1.0
    High: 'high',         // 0.9
    Medium: 'medium',     // 0.7-0.8
    Low: 'low',           // 0.5
    Minimal: 'minimal',   // 0.3
} as const;

// 2. Extracción del tipo para TypeScript
export type SitemapPriority = typeof SitemapPriority[keyof typeof SitemapPriority];