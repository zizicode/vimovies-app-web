// ============================================================
// worker.ts — Cloudflare Worker · Vimovies
// Detecta bots vs usuarios y enruta el tráfico correctamente
// Deploy: wrangler deploy
// ============================================================

// ── Configura tus URLs reales aquí ──────────────────────────
const VERCEL_URL = 'https://vimovies.com'    // Tu frontend en Vercel
const API_URL    = 'https://api.vimovies.com' // Tu API Hono en Render

// ── Patrón de bots conocidos ────────────────────────────────
const BOT_PATTERN = /googlebot|google-inspectiontool|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|rogerbot|screaming.frog/i

// ── Rutas que siempre sirve Hono (nunca Vercel) ─────────────
const HONO_ROUTES = [
  '/sitemap.xml',
  '/sitemap-index.xml',
  '/robots.txt',
  '/feed.xml',
  '/rss.xml',
]

// ── Patrones de rutas que siempre sirven Hono ───────────────
const HONO_PATTERNS = [
  /^\/sitemap-.*\.xml$/, // Todos los sitemaps individuales
]

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url)
      const ua = request.headers.get('user-agent') || ''
      const isBot = BOT_PATTERN.test(ua)

      // 1. Rutas estáticas SEO → SIEMPRE van a Hono (sin importar si es bot o no)
      if (HONO_ROUTES.includes(url.pathname) || HONO_PATTERNS.some(pattern => pattern.test(url.pathname))) {
        console.log(`[Worker] Sitemap route detected: ${url.pathname} - Proxying to Hono`)
        return await proxyToHono(url.pathname + url.search)
      }

      // 2. Bot detectado → SSR desde Hono
      if (isBot) {
        console.log(`[Worker] Bot detected (${ua}) - Proxying to Hono render: ${url.pathname}`)
        const renderPath = '/render' + url.pathname + url.search
        try {
          const response = await proxyToHono(renderPath)
          if (response.status === 404) {
            console.log(`[Worker] Hono render returned 404 - Using fallback`)
            return fallbackBotResponse(url.pathname)
          }
          return response
        } catch {
          console.log(`[Worker] Hono render failed - Using fallback`)
          return fallbackBotResponse(url.pathname)
        }
      }

      // 3. Usuario normal → React SPA en Vercel
      console.log(`[Worker] Normal user - Proxying to Vercel: ${url.pathname}`)
      return await proxyToVercel(request, url)
    } catch (error) {
      console.error(`[Worker] Error:`, error)
      return new Response('Internal Server Error', { status: 500 })
    }
  },
}

// ── Helpers ─────────────────────────────────────────────────

async function proxyToHono(path: string): Promise<Response> {
  const target = `${API_URL}${path}`
  console.log(`[Worker] Proxying to Hono: ${target}`)
  try {
    const res = await fetch(target, {
      headers: {
        'X-Forwarded-Host': 'vimovies.com',
        'X-Internal-Request': 'worker',
      },
    })
    console.log(`[Worker] Hono response status: ${res.status}`)
    return res
  } catch (error) {
    console.error(`[Worker] Proxy to Hono failed:`, error)
    return new Response('Service unavailable', { status: 503 })
  }
}

async function proxyToVercel(request: Request, url: URL): Promise<Response> {
  const target = `${VERCEL_URL}${url.pathname}${url.search}`
  const modifiedRequest = new Request(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow',
  })
  try {
    return await fetch(modifiedRequest)
  } catch {
    return new Response('Service unavailable', { status: 503 })
  }
}

// Respuesta mínima válida para bots cuando la ruta SSR aún no existe
function fallbackBotResponse(pathname: string): Response {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Vimovies — El mejor catálogo de películas</title>
  <meta name="description" content="Descubre películas, trailers, sinopsis y dónde verlas online en Vimovies.">
  <link rel="canonical" href="https://vimovies.com${pathname}">
  <meta name="robots" content="noindex">
</head>
<body>
  <h1>Vimovies</h1>
  <p>Tu destino para descubrir cine: trailers, reseñas y dónde ver tus películas favoritas online.</p>
</body>
</html>`
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
