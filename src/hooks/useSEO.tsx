import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical: string
  image?: string
  type?: 'website' | 'video.movie' | 'video.tv_show' | 'article' | 'profile'
  locale?: 'es_ES' | 'en_US'
  noindex?: boolean
  jsonLd?: object | object[]
  alternates?: {
    es: string
    en: string
  }
}

export function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  locale = 'es_ES',
  noindex = false,
  jsonLd,
  alternates
}: SEOProps) {
  const siteName = 'Vimovies'
  const defaultImage = 'https://vimovies.com/web-app-manifest-512x512.png'
  const ogImage = image || defaultImage

  return (
    <Helmet>
      {/* Básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* hreflang para SEO internacional */}
      {alternates && (
        <>
          <link rel="alternate" hrefLang="es" href={alternates.es} />
          <link rel="alternate" hrefLang="en" href={alternates.en} />
          <link rel="alternate" hrefLang="x-default" href={alternates.es} />
        </>
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  )
}
