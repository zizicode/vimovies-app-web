export const mockArticles = [
  {
    id: '1',
    slug: 'mejores-peliculas-2024',
    author_id: 'author-1',
    category_id: 1,
    title_es: 'Las Mejores Películas de 2024',
    title_en: 'Best Movies of 2024',
    excerpt_es: 'Descubre las películas más destacadas del año 2024, desde blockbusters de Hollywood hasta joyas del cine independiente.',
    excerpt_en: 'Discover the most standout films of 2024, from Hollywood blockbusters to indie cinema gems.',
    content_es: `<p>El año 2024 ha sido un año increíble para el cine. Con una gran variedad de géneros y estilos, los directores han superado las expectativas del público.</p>
    <h2>Blockbusters</h2>
    <p>Las grandes producciones de Hollywood han dominado la taquilla con efectos visuales impresionantes y historias emocionantes.</p>
    <h2>Cine Independiente</h2>
    <p>El cine independiente ha demostrado que no necesitas un gran presupuesto para contar historias impactantes.</p>`,
    content_en: `<p>2024 has been an incredible year for cinema. With a wide variety of genres and styles, directors have exceeded audience expectations.</p>
    <h2>Blockbusters</h2>
    <p>Major Hollywood productions have dominated the box office with stunning visual effects and exciting stories.</p>
    <h2>Independent Cinema</h2>
    <p>Independent cinema has proven that you don't need a big budget to tell impactful stories.</p>`,
    cover_image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
    intent: 'informational',
    primary_keyword_es: 'mejores películas 2024',
    secondary_keywords: ['cine', 'películas', 'estrenos'],
    status: 'published',
    locale: 'es',
    published_at: '2024-01-15T10:00:00Z',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    faqs: [
      {
        id: '1',
        question_es: '¿Cuáles son las películas más esperadas de 2024?',
        question_en: 'What are the most anticipated movies of 2024?',
        answer_es: 'Las películas más esperadas incluyen secuelas de franquicias populares y nuevas producciones de directores reconocidos.',
        answer_en: 'The most anticipated movies include sequels to popular franchises and new productions from renowned directors.'
      },
      {
        id: '2',
        question_es: '¿Dónde puedo ver estas películas?',
        question_en: 'Where can I watch these movies?',
        answer_es: 'La mayoría de las películas están disponibles en plataformas de streaming como Netflix, Amazon Prime y Disney+.',
        answer_en: 'Most movies are available on streaming platforms like Netflix, Amazon Prime, and Disney+.'
      }
    ],
    mentions: [],
    tags: [
      {
        id: 1,
        slug: 'cine',
        name_es: 'Cine',
        name_en: 'Cinema'
      },
      {
        id: 2,
        slug: 'estrenos',
        name_es: 'Estrenos',
        name_en: 'Releases'
      }
    ],
    sitemap_priority: 'high'
  },
  {
    id: '2',
    slug: 'guia-streaming-películas',
    author_id: 'author-1',
    category_id: 2,
    title_es: 'Guía Completa de Streaming para Películas',
    title_en: 'Complete Streaming Guide for Movies',
    excerpt_es: 'Todo lo que necesitas saber sobre las plataformas de streaming: precios, catálogos y cómo elegir la mejor opción.',
    excerpt_en: 'Everything you need to know about streaming platforms: prices, catalogs, and how to choose the best option.',
    content_es: `<p>El streaming se ha convertido en la forma principal de consumir contenido audiovisual. Aquí te presentamos una guía completa.</p>
    <h2>Principales Plataformas</h2>
    <p>Netflix, Amazon Prime, Disney+ y HBO Max son las líderes del mercado.</p>
    <h2>Comparación de Precios</h2>
    <p>Cada plataforma ofrece diferentes planes con precios variados según las necesidades del usuario.</p>`,
    content_en: `<p>Streaming has become the primary way to consume audiovisual content. Here's a complete guide.</p>
    <h2>Main Platforms</h2>
    <p>Netflix, Amazon Prime, Disney+, and HBO Max are the market leaders.</p>
    <h2>Price Comparison</h2>
    <p>Each platform offers different plans with varying prices based on user needs.</p>`,
    cover_image_url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200',
    intent: 'informational',
    primary_keyword_es: 'streaming películas',
    secondary_keywords: ['netflix', 'amazon prime', 'disney+'],
    status: 'published',
    locale: 'es',
    published_at: '2024-02-20T10:00:00Z',
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-20T10:00:00Z',
    faqs: [
      {
        id: '3',
        question_es: '¿Cuál es la plataforma de streaming más barata?',
        question_en: 'Which is the cheapest streaming platform?',
        answer_es: 'Depende de las promociones disponibles, pero generalmente Amazon Prime ofrece el mejor valor por dinero.',
        answer_en: 'It depends on available promotions, but Amazon Prime generally offers the best value for money.'
      }
    ],
    mentions: [],
    tags: [
      {
        id: 3,
        slug: 'streaming',
        name_es: 'Streaming',
        name_en: 'Streaming'
      },
      {
        id: 4,
        slug: 'guias',
        name_es: 'Guías',
        name_en: 'Guides'
      }
    ],
    sitemap_priority: 'medium'
  },
  {
    id: '3',
    slug: 'historia-cine-terror',
    author_id: 'author-2',
    category_id: 3,
    title_es: 'La Historia del Cine de Terror',
    title_en: 'The History of Horror Cinema',
    excerpt_es: 'Un recorrido por la evolución del cine de terror desde sus inicios hasta los clásicos modernos.',
    excerpt_en: 'A journey through the evolution of horror cinema from its beginnings to modern classics.',
    content_es: `<p>El cine de terror tiene una rica historia que se remonta a los primeros días del cine mudo.</p>
    <h2>Los Inicios</h2>
    <p>El Expreso de Orfeo (1927) marcó el inicio del cine de terror sonoro.</p>
    <h2>La Era Dorada</h2>
    <p>Los años 30 y 30 vieron el surgimiento de los clásicos de Universal como Drácula y Frankenstein.</p>`,
    content_en: `<p>Horror cinema has a rich history dating back to the early days of silent film.</p>
    <h2>The Beginnings</h2>
    <p>The Phantom of the Opera (1925) marked the beginning of sound horror cinema.</p>
    <h2>The Golden Age</h2>
    <p>The 1930s and 1940s saw the rise of Universal classics like Dracula and Frankenstein.</p>`,
    cover_image_url: 'https://images.unsplash.com/photo-1509248961895-403493d877b5?w=1200',
    intent: 'informational',
    primary_keyword_es: 'cine terror',
    secondary_keywords: ['historia', 'clásicos', 'universal'],
    status: 'published',
    locale: 'es',
    published_at: '2024-03-10T10:00:00Z',
    created_at: '2024-03-05T10:00:00Z',
    updated_at: '2024-03-10T10:00:00Z',
    faqs: [],
    mentions: [],
    tags: [
      {
        id: 5,
        slug: 'terror',
        name_es: 'Terror',
        name_en: 'Horror'
      },
      {
        id: 6,
        slug: 'historia',
        name_es: 'Historia',
        name_en: 'History'
      }
    ],
    sitemap_priority: 'medium'
  },
  {
    id: '4',
    slug: 'oscars-2024-predicciones',
    author_id: 'author-1',
    category_id: 1,
    title_es: 'Predicciones para los Oscars 2024',
    title_en: 'Oscars 2024 Predictions',
    excerpt_es: 'Nuestras predicciones para los ganadores de los premios Oscar 2024 en las categorías principales.',
    excerpt_en: 'Our predictions for the winners of the 2024 Academy Awards in the main categories.',
    content_es: `<p>Los Oscars 2024 prometen ser una ceremonia llena de sorpresas y emociones.</p>
    <h2>Mejor Película</h2>
    <p>La competencia es reñida con varias producciones fuertes.</p>
    <h2>Mejor Director</h2>
    <p>Los directores nominados han entregado trabajos excepcionales este año.</p>`,
    content_en: `<p>The 2024 Oscars promise to be a ceremony full of surprises and emotions.</p>
    <h2>Best Picture</h2>
    <p>The competition is tight with several strong productions.</p>
    <h2>Best Director</h2>
    <p>The nominated directors have delivered exceptional work this year.</p>`,
    cover_image_url: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1200',
    intent: 'seasonal',
    primary_keyword_es: 'oscars 2024',
    secondary_keywords: ['premios', 'cine', 'academy awards'],
    status: 'published',
    locale: 'es',
    published_at: '2024-02-01T10:00:00Z',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    faqs: [
      {
        id: '4',
        question_es: '¿Cuándo son los Oscars 2024?',
        question_en: 'When are the 2024 Oscars?',
        answer_es: 'La ceremonia de los Oscars 2024 se llevará a cabo en marzo de 2024.',
        answer_en: 'The 2024 Oscars ceremony will take place in March 2024.'
      }
    ],
    mentions: [],
    tags: [
      {
        id: 7,
        slug: 'oscars',
        name_es: 'Oscars',
        name_en: 'Oscars'
      },
      {
        id: 8,
        slug: 'premios',
        name_es: 'Premios',
        name_en: 'Awards'
      }
    ],
    sitemap_priority: 'high'
  },
  {
    id: '5',
    slug: 'cine-animacion-actualidad',
    author_id: 'author-2',
    category_id: 4,
    title_es: 'El Estado Actual del Cine de Animación',
    title_en: 'The Current State of Animation Cinema',
    excerpt_es: 'Analizamos las tendencias y el futuro del cine de animación en la era digital.',
    excerpt_en: 'We analyze trends and the future of animation cinema in the digital age.',
    content_es: `<p>El cine de animación ha evolucionado dramáticamente en las últimas décadas.</p>
    <h2>Tecnología CGI</h2>
    <p>Los avances en CGI han permitido crear mundos increíblemente realistas.</p>
    <h2>Animación 2D vs 3D</h2>
    <p>Ambos estilos tienen su lugar en el cine actual y ofrecen experiencias diferentes.</p>`,
    content_en: `<p>Animation cinema has evolved dramatically in recent decades.</p>
    <h2>CGI Technology</h2>
    <p>Advances in CGI have allowed the creation of incredibly realistic worlds.</p>
    <h2>2D vs 3D Animation</h2>
    <p>Both styles have their place in modern cinema and offer different experiences.</p>`,
    cover_image_url: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=1200',
    intent: 'informational',
    primary_keyword_es: 'cine animación',
    secondary_keywords: ['pixar', 'disney', 'cgi'],
    status: 'published',
    locale: 'es',
    published_at: '2024-04-05T10:00:00Z',
    created_at: '2024-04-01T10:00:00Z',
    updated_at: '2024-04-05T10:00:00Z',
    faqs: [],
    mentions: [],
    tags: [
      {
        id: 9,
        slug: 'animacion',
        name_es: 'Animación',
        name_en: 'Animation'
      },
      {
        id: 10,
        slug: 'tecnologia',
        name_es: 'Tecnología',
        name_en: 'Technology'
      }
    ],
    sitemap_priority: 'medium'
  }
]

export const mockArticleDetail = {
  id: '1',
  slug: 'mejores-peliculas-2024',
  author_id: 'author-1',
  category_id: 1,
  title_es: 'Las Mejores Películas de 2024',
  title_en: 'Best Movies of 2024',
  excerpt_es: 'Descubre las películas más destacadas del año 2024, desde blockbusters de Hollywood hasta joyas del cine independiente.',
  excerpt_en: 'Discover the most standout films of 2024, from Hollywood blockbusters to indie cinema gems.',
  content_es: `<p>El año 2024 ha sido un año increíble para el cine. Con una gran variedad de géneros y estilos, los directores han superado las expectativas del público.</p>
    <h2>Blockbusters</h2>
    <p>Las grandes producciones de Hollywood han dominado la taquilla con efectos visuales impresionantes y historias emocionantes. Películas como "Dune: Part Two" y "Godzilla x Kong: The New Empire" han demostrado que el cine de espectáculo sigue vivo.</p>
    <h2>Cine Independiente</h2>
    <p>El cine independiente ha demostrado que no necesitas un gran presupuesto para contar historias impactantes. Directores emergentes han creado obras que resuenan con audiencias de todo el mundo.</p>
    <h2>Dramas Históricos</h2>
    <p>Los dramas históricos han tenido un año destacado, con producciones que exploran eventos importantes con una perspectiva fresca y conmovedora.</p>
    <blockquote>El cine no solo entretiene, también educa e inspira a las nuevas generaciones.</blockquote>
    <p>En conclusión, 2024 será recordado como un año de diversidad y calidad en el séptimo arte.</p>`,
  content_en: `<p>2024 has been an incredible year for cinema. With a wide variety of genres and styles, directors have exceeded audience expectations.</p>
    <h2>Blockbusters</h2>
    <p>Major Hollywood productions have dominated the box office with stunning visual effects and exciting stories. Films like "Dune: Part Two" and "Godzilla x Kong: The New Empire" have shown that spectacle cinema is alive and well.</p>
    <h2>Independent Cinema</h2>
    <p>Independent cinema has proven that you don't need a big budget to tell impactful stories. Emerging directors have created works that resonate with audiences worldwide.</p>
    <h2>Historical Dramas</h2>
    <p>Historical dramas have had a standout year, with productions exploring important events with a fresh and moving perspective.</p>
    <blockquote>Cinema not only entertains, it also educates and inspires new generations.</blockquote>
    <p>In conclusion, 2024 will be remembered as a year of diversity and quality in the seventh art.</p>`,
  cover_image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
  intent: 'informational',
  primary_keyword_es: 'mejores películas 2024',
  secondary_keywords: ['cine', 'películas', 'estrenos'],
  status: 'published',
  locale: 'es',
  published_at: '2024-01-15T10:00:00Z',
  created_at: '2024-01-10T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
  faqs: [
    {
      id: '1',
      question_es: '¿Cuáles son las películas más esperadas de 2024?',
      question_en: 'What are the most anticipated movies of 2024?',
      answer_es: 'Las películas más esperadas incluyen secuelas de franquicias populares y nuevas producciones de directores reconocidos como Christopher Nolan y Denis Villeneuve.',
      answer_en: 'The most anticipated movies include sequels to popular franchises and new productions from renowned directors like Christopher Nolan and Denis Villeneuve.'
    },
    {
      id: '2',
      question_es: '¿Dónde puedo ver estas películas?',
      question_en: 'Where can I watch these movies?',
      answer_es: 'La mayoría de las películas están disponibles en plataformas de streaming como Netflix, Amazon Prime y Disney+. Algunos estrenos exclusivos estarán primero en cines.',
      answer_en: 'Most movies are available on streaming platforms like Netflix, Amazon Prime, and Disney+. Some exclusive releases will be in theaters first.'
    },
    {
      id: '3',
      question_es: '¿Cuánto cuesta ver estas películas en cines?',
      question_en: 'How much does it cost to watch these movies in theaters?',
      answer_es: 'El precio varía según el cine y la hora, pero generalmente oscila entre $10 y $15 dólares por entrada.',
      answer_en: 'Prices vary by theater and time, but generally range from $10 to $15 per ticket.'
    }
  ],
  mentions: [
    {
      media_id: '1',
      mention_type: 'primary',
      display_order: 1,
      media: {
        id: 1,
        slug: 'dune-part-two-2024',
        title_es: 'Dune: Parte Dos',
        title_en: 'Dune: Part Two',
        poster_path: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
        release_date: '2024-03-01'
      }
    },
    {
      media_id: '2',
      mention_type: 'supporting',
      display_order: 2,
      media: {
        id: 2,
        slug: 'godzilla-x-kong-2024',
        title_es: 'Godzilla x Kong: El Nuevo Imperio',
        title_en: 'Godzilla x Kong: The New Empire',
        poster_path: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
        release_date: '2024-03-29'
      }
    }
  ],
  tags: [
    {
      id: 1,
      slug: 'cine',
      name_es: 'Cine',
      name_en: 'Cinema'
    },
    {
      id: 2,
      slug: 'estrenos',
      name_es: 'Estrenos',
      name_en: 'Releases'
    },
    {
      id: 3,
      slug: '2024',
      name_es: '2024',
      name_en: '2024'
    }
  ],
  sitemap_priority: 'high'
}
