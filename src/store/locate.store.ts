/**
 * stores/locale.store.ts
 * Store Zustand para el idioma activo de Vimovies
 *
 * - Persiste en localStorage con la clave "vimovies_locale"
 * - Sincroniza con la cookie "locale" para que el servidor también la lea
 * - Expone el translator t() listo para usar en componentes
 */

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { loadLocale, createTranslator, type Translator } from "../lib/i18n/i18n"
import {
  type Locale,
  type TranslationKey,
//   type InterpolationVars,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
} from "../types/i18n.types"

// ─── Tipos del store ──────────────────────────────────────────────────────────

interface LocaleState {
  /** Idioma actualmente activo */
  locale: Locale
  /** true mientras se carga el JSON del idioma */
  isLoading: boolean
  /** true mientras se está cambiando de idioma (activa el PageLoader) */
  isChangingLocale: boolean
  /** Función de traducción lista para usar en componentes */
  t: Translator
}

interface LocaleActions {
  /**
   * Cambia el idioma activo.
   * Carga el JSON si no está en cache, actualiza el store y la cookie.
   */
  setLocale: (locale: Locale) => Promise<void>
  /**
   * Inicializa el store al arrancar la app.
   * Detecta el idioma guardado → lo carga → hidrata el translator.
   */
  init: (detectedLocale?: Locale) => Promise<void>
}

export type LocaleStore = LocaleState & LocaleActions

// ─── Helper: sincronizar cookie ───────────────────────────────────────────────
// Para que detectLocale.ts (server-side) pueda leerla en la próxima request

function syncCookie(locale: Locale) {
  if (typeof document === "undefined") return
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  document.cookie = `locale=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

// ─── Helper: noop translator mientras carga ───────────────────────────────────

const noopTranslator: Translator = (key: TranslationKey) => key as string

// ─── Store ────────────────────────────────────────────────────────────────────

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set, get) => ({
      // ── State ────────────────────────────────────────────────────────────
      locale: DEFAULT_LOCALE,
      isLoading: true,
      isChangingLocale: false,
      t: noopTranslator,

      // ── Actions ──────────────────────────────────────────────────────────

      setLocale: async (locale: Locale) => {
        if (!SUPPORTED_LOCALES.includes(locale)) {
          console.warn(`[i18n] Locale "${locale}" not supported. Falling back to "${DEFAULT_LOCALE}"`)
          locale = DEFAULT_LOCALE
        }

        // Si ya es el idioma activo, no hacer nada
        if (get().locale === locale && !get().isLoading) return

        set({ isLoading: true, isChangingLocale: true })

        try {
          await loadLocale(locale)
          // Si el idioma no es el default, asegurarse de que el fallback también esté cargado
          if (locale !== DEFAULT_LOCALE) {
            await loadLocale(DEFAULT_LOCALE)
          }

          const t = createTranslator(locale)
          set({ locale, t, isLoading: false, isChangingLocale: false })
          syncCookie(locale)

          // Actualizar atributo lang en <html> para accesibilidad y SEO
          if (typeof document !== "undefined") {
            document.documentElement.lang = locale
          }
        } catch (err) {
          console.error(`[i18n] Failed to load locale "${locale}":`, err)
          set({ isLoading: false, isChangingLocale: false })
        }
      },

      init: async (detectedLocale?: Locale) => {
        const stored = get().locale         // viene de localStorage vía persist
        const target = detectedLocale ?? stored ?? DEFAULT_LOCALE

        // Validar que sea un locale soportado
        const safe = SUPPORTED_LOCALES.includes(target as Locale)
          ? (target as Locale)
          : DEFAULT_LOCALE

        await get().setLocale(safe)
      },
    }),

    {
      name: "vimovies_locale",             // clave en localStorage
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos el locale, no el translator ni isChangingLocale (no son serializables)
      partialize: (state) => ({ locale: state.locale }),
    }
  )
)

// ─── Selector helpers (para evitar re-renders innecesarios) ───────────────────

/** Solo el idioma activo */
export const useLocale = () => useLocaleStore((s) => s.locale)

/** Solo la función t() */
export const useT = () => useLocaleStore((s) => s.t)

/** Solo el estado de carga */
export const useLocaleLoading = () => useLocaleStore((s) => s.isLoading)

/** Acción para cambiar idioma */
export const useSetLocale = () => useLocaleStore((s) => s.setLocale)

// ─── Hook compuesto (el más usado en componentes) ─────────────────────────────

/**
 * Hook principal de i18n para componentes React.
 *
 * @example
 * ```tsx
 * const { t, locale, setLocale, isChangingLocale } = useI18n()
 *
 * // Traducción simple
 * t("common.actions.search")           // → "Buscar"
 *
 * // Con interpolación
 * t("movie.info.runtime", { minutes: 120 })   // → "120 min"
 *
 * // Con pluralización
 * t("search.results", { count: 1, query: "Inception" })   // → "1 resultado para \"Inception\""
 * t("search.results", { count: 5, query: "Inception" })   // → "5 resultados para \"Inception\""
 *
 * // Cambiar idioma
 * setLocale("en")
 * ```
 */
export function useI18n() {
  const t = useLocaleStore((s) => s.t)
  const locale = useLocaleStore((s) => s.locale)
  const isLoading = useLocaleStore((s) => s.isLoading)
  const isChangingLocale = useLocaleStore((s) => s.isChangingLocale)
  const setLocale = useLocaleStore((s) => s.setLocale)

  return { t, locale, isLoading, isChangingLocale, setLocale }
}