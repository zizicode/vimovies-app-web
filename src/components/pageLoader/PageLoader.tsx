/**
 * components/pageLoader/PageLoader.tsx
 * Componente de carga global que se monta en el Layout
 *
 * Se activa cuando:
 * - Se está cambiando de idioma (isChangingLocale)
 * - La página está cargando datos (isPageLoading)
 */

import { useEffect, useRef, useState } from "react"
import { useI18n } from "../../store/locate.store"
import { usePageLoaderStore } from "../../store/pageLoader.store"
import "./PageLoader.scss"

const MINIMUM_DISPLAY_MS = 2000
const FADE_OUT_DURATION_MS = 400

export function PageLoader() {
  const { isChangingLocale } = useI18n()
  const { isPageLoading } = usePageLoaderStore()

  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const startTimeRef = useRef<number | null>(null)

  const isLoading = isChangingLocale || isPageLoading

  useEffect(() => {
    if (isLoading) {
      startTimeRef.current = Date.now()
      setFadeOut(false)
      setVisible(true)
    } else {
      if (!startTimeRef.current) return

      const elapsed = Date.now() - startTimeRef.current
      const remaining = Math.max(0, MINIMUM_DISPLAY_MS - elapsed)

      const fadeTimer = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setVisible(false)
          setFadeOut(false)
          startTimeRef.current = null
        }, FADE_OUT_DURATION_MS)
      }, remaining)

      return () => clearTimeout(fadeTimer)
    }
  }, [isLoading])

  if (!visible) return null

  return (
    <div className={`page-loader ${fadeOut ? "page-loader--fade-out" : ""}`}>
      <div className="page-loader__content">
        <div className="page-loader__spinner" />
      </div>
    </div>
  )
}
