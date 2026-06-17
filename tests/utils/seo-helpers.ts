import { Page } from '@playwright/test';

/**
 * Helper utilities for SEO testing
 */

export async function waitForSEOHydration(page: Page): Promise<void> {
  // Esperar a que la página cargue completamente
  await page.waitForLoadState('networkidle');
  
  // Esperar a que react-helmet-async inyecte los meta tags
  // Esto es importante en SPAs donde los meta tags se inyectan vía JavaScript
  await page.waitForTimeout(1000);
  
  // Opcional: esperar por un selector específico que indique que la página está lista
  // Por ejemplo, esperar que el contenido principal sea visible
  try {
    await page.locator('body').waitFor({ state: 'visible', timeout: 3000 });
  } catch {
    // Si no hay body visible, continuar de todos modos
  }
}

export async function getRobotsMetaContent(page: Page): Promise<string | null> {
  try {
    const robotsMeta = page.locator('meta[name="robots"]');
    const count = await robotsMeta.count();
    
    if (count === 0) {
      return null;
    }
    
    // Si hay múltiples meta robots, tomar el primero
    return await robotsMeta.first().getAttribute('content');
  } catch {
    return null;
  }
}

export async function hasNoindex(page: Page): Promise<boolean> {
  const content = await getRobotsMetaContent(page);
  return content ? content.includes('noindex') : false;
}

export async function hasNofollow(page: Page): Promise<boolean> {
  const content = await getRobotsMetaContent(page);
  return content ? content.includes('nofollow') : false;
}

/**
 * Verifica el estado SEO de una página
 */
export interface SEOStatus {
  hasRobotsMeta: boolean;
  hasNoindex: boolean;
  hasNofollow: boolean;
  content: string | null;
}

export async function getSEOStatus(page: Page): Promise<SEOStatus> {
  const content = await getRobotsMetaContent(page);
  
  return {
    hasRobotsMeta: content !== null,
    hasNoindex: content ? content.includes('noindex') : false,
    hasNofollow: content ? content.includes('nofollow') : false,
    content
  };
}
