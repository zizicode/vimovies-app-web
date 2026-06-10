/**
 * lib/i18n/i18n.ts
 * Motor central de traducción de Vimovies
 *
 * Features:
 *  - Acceso por dot-notation tipado: t("movie.sections.cast")
 *  - Interpolación de variables: t("movie.info.runtime", { minutes: 120 })
 *  - Pluralización simple: t("search.results", { count: 1 })
 *  - Lazy loading de locales por idioma
 *  - Fallback automático a "es" si falta una clave en "en"
 */

import type { Locale, TranslationKey, InterpolationVars, TranslationTree } from "../../types/i18n.types"
import { DEFAULT_LOCALE } from "../../types/i18n.types"

// ─── Cache de traducciones cargadas ──────────────────────────────────────────

const cache: Partial<Record<Locale, TranslationTree>> = {}

// ─── Lazy loader usando import.meta.glob (Vite) ────────────────────────────────

const localeModules = import.meta.glob("./locales/*/index.json", {
  eager: false,
  import: "default",
})

// ─── Lazy loader ─────────────────────────────────────────────────────────────

export async function loadLocale(locale: Locale): Promise<TranslationTree> {
  if (cache[locale]) return cache[locale]!

  /* @vite-ignore */
  const modulePath = `./locales/${locale}/index.json`
  const loader = localeModules[modulePath]
  if (!loader) {
    throw new Error(`Locale "${locale}" not found. Available locales: ${Object.keys(localeModules).join(", ")}`)
  }

  cache[locale] = (await loader()) as TranslationTree
  return cache[locale]!
}

// ─── Resolver de dot-notation ─────────────────────────────────────────────────
// Recibe "movie.sections.cast" → navega el árbol → devuelve la string

function resolve(tree: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".")
  let current: unknown = tree

  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === "string" ? current : undefined
}

// ─── Interpolación ────────────────────────────────────────────────────────────
// Reemplaza {{variable}} con los valores del objeto vars
// También maneja pluralización: si hay "count" en vars busca clave_plural

function interpolate(template: string, vars?: InterpolationVars): string {
  if (!vars) return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return vars[key] != null ? String(vars[key]) : `{{${key}}}`
  })
}

// ─── Función t() sincrónica ───────────────────────────────────────────────────
// Requiere que el locale ya esté cargado en cache.
// Se usa en componentes React después de que loadLocale() ya se ejecutó.

export function createTranslator(locale: Locale) {
  const translations = cache[locale] ?? cache[DEFAULT_LOCALE]
  const fallback = cache[DEFAULT_LOCALE]

  if (!translations) {
    console.warn(`[i18n] Locale "${locale}" not loaded. Did you call loadLocale()?`)
  }

  return function t(key: TranslationKey, vars?: InterpolationVars): string {
    const tree = translations as unknown as Record<string, unknown>
    const fallbackTree = fallback as unknown as Record<string, unknown>

    // Pluralización: si hay count y existe la clave _plural, usarla
    const resolvedKey = key as string
    if (vars?.count !== undefined) {
      const count = Number(vars.count)
      const pluralKey = `${key}_plural`
      const pluralValue = resolve(tree, pluralKey) ?? resolve(fallbackTree, pluralKey)
      if (pluralValue && count !== 1) {
        return interpolate(pluralValue, vars)
      }
    }

    // Clave principal
    const value =
      resolve(tree, resolvedKey) ??
      resolve(fallbackTree ?? {}, resolvedKey) ??
      resolvedKey  // último fallback: devuelve la clave misma

    return interpolate(value, vars)
  }
}

export type Translator = ReturnType<typeof createTranslator>