/**
 * Cloudflare Worker para Vimovies
 * - Detecta bots vs usuarios y enruta el tráfico correctamente
 * - Proxy de sitemaps y robots.txt a la API
 * - Bots → API para SSR (HTML renderizado)
 * - Usuarios → Vercel para React SPA
 */

// Patrón de bots conocidos
const BOT_PATTERN = /googlebot|google-inspectiontool|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|rogerbot|screaming.frog/i;

// Rutas que siempre sirven la API (sitemaps, robots.txt)
const API_ROUTES = [
	'/robots.txt',
	'/sitemap.xml',
	'/sitemap-index.xml',
	'/feed.xml',
	'/rss.xml',
];

// Patrones de rutas que siempre sirven la API
const API_PATTERNS = [
	/^\/sitemap-.*\.xml$/, // Todos los sitemaps individuales
];

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		try {
			const url = new URL(request.url)
			const ua = request.headers.get('user-agent') || ''
			const isBot = BOT_PATTERN.test(ua)

			// 1. Rutas estáticas SEO → SIEMPRE van a la API (sin importar si es bot o no)
			if (API_ROUTES.includes(url.pathname) || API_PATTERNS.some(pattern => pattern.test(url.pathname))) {
				console.log(`[Worker] SEO route detected: ${url.pathname} - Proxying to API`)
				return await proxyToAPI(request, url.pathname + url.search, env)
			}

			// 2. Bot detectado → API para SSR (HTML renderizado del servidor)
			if (isBot) {
				console.log(`[Worker] Bot detected (${ua}) - Proxying to API SSR: ${url.pathname}`)
				// Usar /render prefix para obtener HTML del servidor
				const renderPath = '/render' + url.pathname + url.search
				return await proxyToAPI(request, renderPath, env)
			}

			// 3. Usuario normal → React SPA en Vercel
			console.log(`[Worker] Normal user - Proxying to Vercel: ${url.pathname}`)
			return await proxyToVercel(request, url, env)
		} catch (error) {
			console.error(`[Worker] Error:`, error)
			return new Response('Internal Server Error', { status: 500 })
		}
	},
};

// Helpers

async function proxyToAPI(request: Request, path: string, env: Env): Promise<Response> {
	const target = `${env.API_URL}${path}`
	console.log(`[Worker] Proxying to API: ${target}`)
	try {
		const response = await fetch(target, {
			method: request.method,
			headers: request.headers,
			body: request.body,
			redirect: 'follow'
		})
		console.log(`[Worker] API response status: ${response.status}`)

		// Copiar headers importantes y agregar cache
		const newHeaders = new Headers()
		response.headers.forEach((value, key) => {
			newHeaders.set(key, value)
		})
		newHeaders.set('Cache-Control', 'public, max-age=3600')
		newHeaders.set('X-Forwarded-Host', 'vimovies.com')

		return new Response(response.body, {
			status: response.status,
			headers: newHeaders
		})
	} catch (error) {
		console.error(`[Worker] Proxy to API failed:`, error)
		return new Response('Service unavailable', { status: 503 })
	}
}

async function proxyToVercel(request: Request, url: URL, env: Env): Promise<Response> {
	const target = `${env.VERCEL_URL}${url.pathname}${url.search}`
	console.log(`[Worker] Proxying to Vercel: ${target}`)

	try {
		const response = await fetch(target, {
			method: request.method,
			headers: request.headers,
			body: request.body,
			redirect: 'follow',
		})
		console.log(`[Worker] Vercel response status: ${response.status}`)
		return response
	} catch (error) {
		console.error(`[Worker] Proxy to Vercel failed:`, error)
		return new Response('Service unavailable', { status: 503 })
	}
}
