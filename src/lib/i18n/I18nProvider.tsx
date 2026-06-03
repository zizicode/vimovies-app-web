/**
 * lib/i18n/I18nProvider.tsx
 * Inicializa el sistema i18n al montar la app.
 *
 * Colócalo en App.tsx envolviendo toda la aplicación:
 *
 * ```tsx
 * // App.tsx
 * import { I18nProvider } from "@/lib/i18n/I18nProvider"
 *
 * export default function App() {
 *   return (
 *     <I18nProvider>
 *       <RouterProvider router={router} />
 *     </I18nProvider>
 *   )
 * }
 * ```
 */

import { useEffect, type ReactNode } from "react"
import { useLocaleStore } from "../../store/locate.store"
import { detectLocaleClient } from "../../utils/locate"
import type { Locale } from "../../types/i18n.types"
import { SUPPORTED_LOCALES } from "../../types/i18n.types"

interface I18nProviderProps {
  children: ReactNode
  /**
   * Locale detectado por el servidor (pasado como prop desde el layout/root).
   * Si se pasa, tiene prioridad sobre la detección client-side.
   * Útil cuando usas Next.js middleware o un backend que ya detectó el idioma.
   */
  serverLocale?: Locale
}

export function I18nProvider({ children, serverLocale }: I18nProviderProps) {
  const init = useLocaleStore((s) => s.init)
  const isLoading = useLocaleStore((s) => s.isLoading)

  useEffect(() => {
    let locale: Locale | undefined = serverLocale

    // Si no viene del servidor, detectar en cliente
    if (!locale) {
      const detected = detectLocaleClient()
      locale = SUPPORTED_LOCALES.includes(detected.language as Locale)
        ? (detected.language as Locale)
        : undefined
    }

    init(locale)
  }, [init, serverLocale])

  // Mientras el idioma se está cargando por primera vez, no renderizar nada
  // para evitar flash de claves sin traducir.
  // Si prefieres un skeleton global, reemplaza null por tu componente de carga.
  if (isLoading) return null

  return <>{children}</>
}
