import type { Article } from '../types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'mock-1',
    slug: 'mejores-estrenos-2024',
    title_es: 'Los estrenos más esperados de 2024',
    title_en: 'Most anticipated releases of 2024',
    excerpt_es: 'Analizamos las películas que prometen romper la taquilla este año, desde épicas espaciales hasta dramas íntimos.',
    excerpt_en: 'We analyze the movies promising to break the box office this year, from space epics to intimate dramas.',
    content_es: '',
    cover_image_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    published_at: new Date().toISOString(),
    reading_time_minutes: 8,
    intent: 'list',
    status: 'published',
    noindex: false,
    author_id: 'auth-1',
    authors: {
      display_name: 'Alex Rivera',
      slug: 'alex-rivera'
    },
    article_categories: {
      slug: 'noticias',
      name_es: 'Noticias',
      name_en: 'News'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-2',
    slug: 'guia-streaming-calidad',
    title_es: 'Guía definitiva: ¿Cómo elegir tu plataforma de streaming?',
    title_en: 'Ultimate Guide: How to choose your streaming platform?',
    excerpt_es: 'Comparamos precios, catálogos y calidad de audio/video de Netflix, HBO Max, Disney+ y más.',
    excerpt_en: 'We compare prices, catalogs, and audio/video quality of Netflix, HBO Max, Disney+, and more.',
    content_es: '',
    cover_image_url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800',
    published_at: new Date(Date.now() - 86400000).toISOString(),
    reading_time_minutes: 12,
    intent: 'guide',
    status: 'published',
    noindex: false,
    author_id: 'auth-2',
    authors: {
      display_name: 'Elena Gómez',
      slug: 'elena-gomez'
    },
    article_categories: {
      slug: 'guias',
      name_es: 'Guías',
      name_en: 'Guides'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-3',
    slug: 'critica-obras-maestras',
    title_es: 'Crítica: ¿Es esta la mejor película de la década?',
    title_en: 'Review: Is this the best movie of the decade?',
    excerpt_es: 'Profundizamos en el simbolismo y la técnica detrás del último fenómeno cinematográfico mundial.',
    excerpt_en: 'We dive deep into the symbolism and technique behind the latest global cinematic phenomenon.',
    content_es: '',
    cover_image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
    published_at: new Date(Date.now() - 172800000).toISOString(),
    reading_time_minutes: 6,
    intent: 'review',
    status: 'published',
    noindex: false,
    author_id: 'auth-3',
    authors: {
      display_name: 'Marco Polo',
      slug: 'marco-polo'
    },
    article_categories: {
      slug: 'criticas',
      name_es: 'Críticas',
      name_en: 'Reviews'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
