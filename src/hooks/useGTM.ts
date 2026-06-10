interface GTMEvent {
  event: string;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: number;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const useGTM = () => {
  const pushEvent = (event: GTMEvent) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(event);
    }
  };

  const trackPageView = (pageTitle: string, pagePath: string) => {
    pushEvent({
      event: 'page_view',
      page_title: pageTitle,
      page_path: pagePath,
    });
  };

  const trackClick = (category: string, action: string, label?: string) => {
    pushEvent({
      event: 'click',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    });
  };

  const trackMovieClick = (movieTitle: string, movieSlug: string) => {
    pushEvent({
      event: 'movie_click',
      eventCategory: 'content',
      eventAction: 'view_movie',
      eventLabel: movieTitle,
      movie_slug: movieSlug,
    });
  };

  const trackArticleClick = (articleTitle: string, articleSlug: string) => {
    pushEvent({
      event: 'article_click',
      eventCategory: 'content',
      eventAction: 'view_article',
      eventLabel: articleTitle,
      article_slug: articleSlug,
    });
  };

  const trackNavigation = (destination: string, label?: string) => {
    pushEvent({
      event: 'navigation',
      eventCategory: 'navigation',
      eventAction: 'click',
      eventLabel: label || destination,
      destination,
    });
  };

  const trackSearch = (searchTerm: string, resultCount?: number) => {
    pushEvent({
      event: 'search',
      eventCategory: 'search',
      eventAction: 'submit',
      eventLabel: searchTerm,
      search_term: searchTerm,
      result_count: resultCount,
    });
  };

  const trackFilter = (filterType: string, filterValue: string) => {
    pushEvent({
      event: 'filter',
      eventCategory: 'filter',
      eventAction: filterType,
      eventLabel: filterValue,
    });
  };

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
