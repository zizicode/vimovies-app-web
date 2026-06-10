/**
 * store/pageLoader.store.ts
 * Store Zustand minimalista para el estado de carga global de páginas
 *
 * Las páginas usan este store para comunicar cuándo están cargando datos.
 * El PageLoader componente se activa cuando isPageLoading es true.
 */

import { create } from "zustand"

// ─── Tipos del store ──────────────────────────────────────────────────────────

interface PageLoaderState {
  /** true mientras la página actual está cargando datos */
  isPageLoading: boolean
}

interface PageLoaderActions {
  /** Establece el estado de carga de la página */
  setPageLoading: (loading: boolean) => void
}

export type PageLoaderStore = PageLoaderState & PageLoaderActions

// ─── Store ────────────────────────────────────────────────────────────────────

export const usePageLoaderStore = create<PageLoaderStore>((set) => ({
  // ── State ────────────────────────────────────────────────────────────
  isPageLoading: false,

  // ── Actions ──────────────────────────────────────────────────────────
  setPageLoading: (loading: boolean) => set({ isPageLoading: loading }),
}))
