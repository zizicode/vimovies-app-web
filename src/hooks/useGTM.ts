import { useCallback } from 'react';

interface GTMEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const push = (event: GTMEvent) => {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(event);
  }
};

export const useGTM = () => {
  const pushEvent = useCallback((event: GTMEvent) => {
    push(event);
  }, []);

  // Solo usar si tu SPA necesita disparar page_view manualmente en cambios de ruta.
  // Si GTM ya lo maneja con historyChange trigger, elimina esto.
  const trackPageView = useCallback((page_title: string, page_path: string) => {
    push({ event: 'page_view', page_title, page_path });
  }, []);

  const trackClick = useCallback((
    category: string,
    action: string,
    label?: string
  ) => {
    push({ event: 'click', category, action, ...(label && { label }) });
  }, []);

  const trackMovieClick = useCallback((title: string, slug: string) => {
    push({ event: 'movie_click', content_type: 'movie', title, slug });
  }, []);

  const trackArticleClick = useCallback((title: string, slug: string) => {
    push({ event: 'article_click', content_type: 'article', title, slug });
  }, []);

  const trackNavigation = useCallback((destination: string, label?: string) => {
    push({
      event: 'navigation_click',
      destination,
      ...(label && { label }),
    });
  }, []);

  const trackSearch = useCallback((
    search_term: string,
    result_count?: number
  ) => {
    push({
      event: 'search',
      search_term,
      ...(result_count !== undefined && { result_count }),
    });
  }, []);

  const trackFilter = useCallback((filter_type: string, filter_value: string) => {
    push({ event: 'filter_apply', filter_type, filter_value });
  }, []);

  return {
    pushEvent,
    trackPageView,
    trackClick,
    trackMovieClick,
    trackArticleClick,
    trackNavigation,
    trackSearch,
    trackFilter,
  };
};