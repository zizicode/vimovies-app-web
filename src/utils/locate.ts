/**
 * detectLocale.ts
 * Detección de idioma y país del visitante (usuarios y bots de Google)
 *
 * Estrategia en capas (orden de prioridad):
 *   1. Query param  ?lang=es  (override manual, útil para tests)
 *   2. Cookie       locale=es-DO  (preferencia guardada previamente)
 *   3. Header       Accept-Language  (navegador / bot de Google)
 *   4. Header       CF-IPCountry  (Cloudflare, gratis en todos los planes)
 *   5. Header       X-Vercel-IP-Country  (Vercel, gratis)
 *   6. Fallback     "es" (español, idioma por defecto de Vimovies)
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface LocaleResult {
  /** Código de idioma BCP-47: "es", "en", "pt", etc. */
  language: string
  /** Código ISO 3166-1 alpha-2: "DO", "US", "MX", etc. Puede ser null si no se detecta */
  country: string | null
  /** Locale completo: "es-DO", "en-US", etc. */
  locale: string
  /** De dónde vino la detección */
  source: "query" | "cookie" | "accept-language" | "cf-country" | "vercel-country" | "fallback"
  /** true si es un bot de Google (Googlebot, AdsBot, etc.) */
  isGooglebot: boolean
  /** true si es cualquier bot/crawler conocido */
  isBot: boolean
}

// ─── Mapeo país → idioma principal ───────────────────────────────────────────
// Cubre los países hispanoamérica + España + los más relevantes para SEO global

const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  // Español
  AR: "es", BO: "es", CL: "es", CO: "es", CR: "es", CU: "es",
  DO: "es", EC: "es", SV: "es", GT: "es", HN: "es", MX: "es",
  NI: "es", PA: "es", PY: "es", PE: "es", PR: "es", ES: "es",
  UY: "es", VE: "es", GQ: "es",
  // Inglés
  US: "en", GB: "en", CA: "en", AU: "en", NZ: "en", IE: "en",
  ZA: "en", SG: "en", IN: "en", PH: "en", NG: "en", GH: "en",
  // Portugués
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  // Francés
  FR: "fr", BE: "fr", CH: "fr", DZ: "fr", MA: "fr", TN: "fr",
  // Alemán
  DE: "de", AT: "de",
  // Italiano
  IT: "it",
  // Chino
  CN: "zh", TW: "zh", HK: "zh",
  // Japonés
  JP: "ja",
  // Coreano
  KR: "ko",
  // Árabe
  SA: "ar", AE: "ar", EG: "ar", IQ: "ar", JO: "ar", KW: "ar",
  LB: "ar", LY: "ar", QA: "ar", SD: "ar", SY: "ar", YE: "ar",
  // Ruso
  RU: "ru", BY: "ru", KZ: "ru",
  // Holandés
  NL: "nl",
  // Turco
  TR: "tr",
  // Hindi
  // IN ya está en "en" — inglés es el idioma web oficial de India
}

// ─── Idiomas que Vimovies soporta (para validar y hacer fallback) ─────────────

const SUPPORTED_LANGUAGES = ["es", "en"] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

// ─── Detección de bots ────────────────────────────────────────────────────────

const GOOGLEBOT_PATTERNS = [
  /googlebot/i,
  /adsbot-google/i,
  /google-inspectiontool/i,
  /mediapartners-google/i,
]

const BOT_PATTERNS = [
  ...GOOGLEBOT_PATTERNS,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /baiduspider/i,
  /semrushbot/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /dotbot/i,
  /slurp/i,           // Yahoo
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /applebot/i,
  /ia_archiver/i,     // Wayback Machine
  /python-requests/i,
  /curl\//i,
  /wget\//i,
]

export function detectBotInfo(userAgent: string): { isBot: boolean; isGooglebot: boolean } {
  const isGooglebot = GOOGLEBOT_PATTERNS.some(p => p.test(userAgent))
  const isBot = isGooglebot || BOT_PATTERNS.some(p => p.test(userAgent))
  return { isBot, isGooglebot }
}

// ─── Parser de Accept-Language ────────────────────────────────────────────────
// Ej: "es-DO,es;q=0.9,en-US;q=0.8,en;q=0.7"  →  "es"

export function parseAcceptLanguage(header: string): { language: string; country: string | null } | null {
  if (!header) return null

  const entries = header
    .split(",")
    .map(part => {
      const [tag, q] = part.trim().split(";q=")
      return { tag: tag.trim(), q: q ? parseFloat(q) : 1.0 }
    })
    .filter(e => e.tag && e.tag !== "*")
    .sort((a, b) => b.q - a.q)

  if (entries.length === 0) return null

  const best = entries[0].tag        // "es-DO"
  const parts = best.split("-")
  const language = parts[0].toLowerCase()   // "es"
  const country = parts[1]?.toUpperCase() ?? null  // "DO"

  return { language, country }
}

// ─── Función principal (Server-Side: Next.js / Express / Hono / Cloudflare Workers) ──

/**
 * Detecta locale a partir de los headers de la request.
 *
 * @example  Next.js App Router
 * ```ts
 * import { detectLocaleFromHeaders } from "@/lib/utils/detectLocale"
 *
 * export async function GET(request: Request) {
 *   const locale = detectLocaleFromHeaders(request.headers, request.url)
 *   // → { language: "es", country: "DO", locale: "es-DO", source: "cf-country", isBot: false, isGooglebot: false }
 * }
 * ```
 *
 * @example  Next.js middleware (middleware.ts)
 * ```ts
 * import { detectLocaleFromHeaders } from "@/lib/utils/detectLocale"
 *
 * export function middleware(req: NextRequest) {
 *   const locale = detectLocaleFromHeaders(req.headers, req.url)
 *   const response = NextResponse.next()
 *   response.headers.set("x-locale", locale.locale)
 *   return response
 * }
 * ```
 */
export function detectLocaleFromHeaders(
  headers: Headers,
  url?: string
): LocaleResult {
  const userAgent = headers.get("user-agent") ?? ""
  const { isBot, isGooglebot } = detectBotInfo(userAgent)

  const buildResult = (
    language: string,
    country: string | null,
    source: LocaleResult["source"]
  ): LocaleResult => {
    const lang = SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)
      ? language
      : "es"
    const loc = country ? `${lang}-${country}` : lang
    return { language: lang, country, locale: loc, source, isBot, isGooglebot }
  }

  // 1. Query param ?lang=es  (máxima prioridad, para tests y overrides)
  if (url) {
    try {
      const params = new URL(url).searchParams
      const langParam = params.get("lang")
      if (langParam) {
        const [lang, country] = langParam.split("-")
        return buildResult(lang.toLowerCase(), country?.toUpperCase() ?? null, "query")
      }
    } catch {
      // URL inválida, ignorar
    }
  }

  // 2. Cookie  locale=es-DO
  const cookieHeader = headers.get("cookie") ?? ""
  const cookieMatch = cookieHeader.match(/(?:^|;\s*)locale=([a-z]{2}(?:-[A-Z]{2})?)/)
  if (cookieMatch) {
    const [lang, country] = cookieMatch[1].split("-")
    return buildResult(lang, country ?? null, "cookie")
  }

  // 3. Cloudflare CF-IPCountry header (gratis, disponible en todos los planes)
  const cfCountry = headers.get("cf-ipcountry")
  if (cfCountry && cfCountry !== "XX" && cfCountry !== "T1") {
    // T1 = Tor, XX = desconocido
    const language = COUNTRY_TO_LANGUAGE[cfCountry] ?? "es"
    return buildResult(language, cfCountry, "cf-country")
  }

  // 4. Vercel X-Vercel-IP-Country header
  const vercelCountry = headers.get("x-vercel-ip-country")
  if (vercelCountry) {
    const language = COUNTRY_TO_LANGUAGE[vercelCountry] ?? "es"
    return buildResult(language, vercelCountry, "vercel-country")
  }

  // 5. Accept-Language (navegador / Googlebot lo envía con "es" si rastrea versión en español)
  const acceptLang = headers.get("accept-language")
  if (acceptLang) {
    const parsed = parseAcceptLanguage(acceptLang)
    if (parsed) {
      return buildResult(parsed.language, parsed.country, "accept-language")
    }
  }

  // 6. Fallback
  return buildResult("es", null, "fallback")
}

// ─── Función Client-Side (browser) ───────────────────────────────────────────

/**
 * Detecta locale en el navegador (client-side).
 * No puede leer IP ni headers de servidor, pero sí navigator.language.
 *
 * @example
 * ```ts
 * const locale = detectLocaleClient()
 * // → { language: "es", country: "DO", locale: "es-DO", source: "accept-language" }
 * ```
 */
export function detectLocaleClient(): Omit<LocaleResult, "isBot" | "isGooglebot"> {
  // 1. Cookie guardada previamente
  const cookieMatch = document.cookie.match(/(?:^|;\s*)locale=([a-z]{2}(?:-[A-Z]{2})?)/)
  if (cookieMatch) {
    const [lang, country] = cookieMatch[1].split("-")
    const language = SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : "es"
    return {
      language,
      country: country ?? null,
      locale: country ? `${language}-${country}` : language,
      source: "cookie",
    }
  }

  // 2. navigator.language  "es-DO", "en-US", etc.
  const nav = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "es"
  const parsed = parseAcceptLanguage(nav)
  if (parsed) {
    const language = SUPPORTED_LANGUAGES.includes(parsed.language as SupportedLanguage)
      ? parsed.language
      : "es"
    return {
      language,
      country: parsed.country,
      locale: parsed.country ? `${language}-${parsed.country}` : language,
      source: "accept-language",
    }
  }

  return { language: "es", country: null, locale: "es", source: "fallback" }
}

// ─── Guardar preferencia en cookie ───────────────────────────────────────────

/**
 * Guarda el locale elegido en una cookie de larga duración.
 * Llama esto cuando el usuario cambia idioma manualmente.
 *
 * @example
 * ```ts
 * saveLocaleCookie("es-DO")  // expira en 1 año
 * ```
 */
export function saveLocaleCookie(locale: string, days = 365): void {
  if (typeof document === "undefined") return
  const expires = new Date()
  expires.setDate(expires.getDate() + days)
  document.cookie = `locale=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}