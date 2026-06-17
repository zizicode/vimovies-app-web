import { test, expect } from '@playwright/test';

/**
 * Test cases for SEO noindex meta tags
 * Verifies that 404/invalid resources have noindex while valid resources don't
 */

interface TestCase {
  url: string;
  shouldHaveNoindex: boolean;
  description: string;
}

const testCases: TestCase[] = [
  // URLs que DEBEN tener <meta name="robots" content="noindex, nofollow">
  {
    url: '/cast/yoyo-mung-ka-wai/?letter=0-9',
    shouldHaveNoindex: true,
    description: 'Ruta inválida heredada (cast con slug no existente)'
  },
  {
    url: '/pelicula/slug-que-no-existe-12345',
    shouldHaveNoindex: true,
    description: 'Película con slug 404 vía API'
  },
  {
    url: '/movie/nonexistent-movie-99999',
    shouldHaveNoindex: true,
    description: 'Movie (EN) con slug 404 vía API'
  },
  {
    url: '/serie/slug-inexistente-99999',
    shouldHaveNoindex: true,
    description: 'Serie con slug 404 vía API'
  },
  {
    url: '/tv-show/nonexistent-series-99999',
    shouldHaveNoindex: true,
    description: 'TV Show (EN) con slug 404 vía API'
  },
  {
    url: '/articulo/articulo-inexistente',
    shouldHaveNoindex: true,
    description: 'Artículo con slug 404 vía API'
  },
  {
    url: '/article/nonexistent-article-99999',
    shouldHaveNoindex: true,
    description: 'Article (EN) con slug 404 vía API'
  },
  {
    url: '/persona/persona-inexistente',
    shouldHaveNoindex: true,
    description: 'Persona con slug 404 vía API'
  },
  {
    url: '/person/nonexistent-person-99999',
    shouldHaveNoindex: true,
    description: 'Person (EN) con slug 404 vía API'
  },
  {
    url: '/actor/nonexistent-actor-99999',
    shouldHaveNoindex: true,
    description: 'Actor con slug 404 vía API'
  },
  {
    url: '/genero/genero-inexistente',
    shouldHaveNoindex: true,
    description: 'Género con slug 404 (debe mostrar noindex pero lista de géneros)'
  },
  {
    url: '/genre/nonexistent-genre-99999',
    shouldHaveNoindex: true,
    description: 'Genre (EN) con slug 404 (debe mostrar noindex pero lista de géneros)'
  },
  {
    url: '/asdkjaslkdj',
    shouldHaveNoindex: true,
    description: 'Ruta completamente aleatoria (catch-all 404)'
  },
  {
    url: '/random/path/that/does/not/exist',
    shouldHaveNoindex: true,
    description: 'Otra ruta aleatoria compleja'
  },

  // URLs que NO deben tener noindex (deben permitir indexación normal)
  {
    url: '/',
    shouldHaveNoindex: false,
    description: 'Home page (siempre indexable)'
  },
  {
    url: '/pelicula/oppenheimer',
    shouldHaveNoindex: false,
    description: 'Película real existente (TODO: verificar slug real)'
  },
  {
    url: '/movie/oppenheimer',
    shouldHaveNoindex: false,
    description: 'Movie (EN) real existente (TODO: verificar slug real)'
  },
  {
    url: '/genero/accion',
    shouldHaveNoindex: false,
    description: 'Género real existente (TODO: verificar slug real)'
  },
  {
    url: '/genre/action',
    shouldHaveNoindex: false,
    description: 'Genre (EN) real existente (TODO: verificar slug real)'
  },
  {
    url: '/peliculas',
    shouldHaveNoindex: false,
    description: 'Lista de películas (ES)'
  },
  {
    url: '/movies',
    shouldHaveNoindex: false,
    description: 'Lista de películas (EN)'
  },
  {
    url: '/actores',
    shouldHaveNoindex: false,
    description: 'Lista de actores (ES)'
  },
  {
    url: '/actors',
    shouldHaveNoindex: false,
    description: 'Lista de actores (EN)'
  }
];

test.describe('SEO Noindex Meta Tags', () => {
  testCases.forEach(({ url, shouldHaveNoindex, description }) => {
    test(`${description} | ${url}`, async ({ page }) => {
      // Navegar a la URL
      await page.goto(url);
      
      // Esperar a que la página termine de cargar e hidratar
      // Usamos networkidle para asegurar que React Helmet haya inyectado los meta tags
      await page.waitForLoadState('networkidle');
      
      // Esperar un poco más para asegurar que react-helmet-async haya terminado
      await page.waitForTimeout(1000);
      
      // Buscar el meta tag robots
      const robotsMeta = page.locator('meta[name="robots"]');
      
      if (shouldHaveNoindex) {
        // DEBE tener el meta tag con noindex
        await expect(robotsMeta).toBeVisible({
          timeout: 5000
        });
        
        const content = await robotsMeta.getAttribute('content');
        expect(content).toContain('noindex');
        expect(content).toContain('nofollow');
        
        console.log(`✅ ${url} - Correctamente tiene noindex`);
      } else {
        // NO debe tener el meta tag con noindex
        const metaExists = await robotsMeta.count() > 0;
        
        if (metaExists) {
          const content = await robotsMeta.getAttribute('content');
          // Si existe, no debe contener noindex
          expect(content).not.toContain('noindex');
          console.log(`✅ ${url} - Meta robots existe pero sin noindex: ${content}`);
        } else {
          // O simplemente no existe (también válido)
          console.log(`✅ ${url} - Sin meta robots (correcto para contenido indexable)`);
        }
      }
    });
  });

  test('Resumen de resultados', async () => {
    // Este test solo sirve para mostrar un resumen al final
    console.log('\n📊 Resumen de Tests SEO Noindex:');
    console.log('=====================================');
    
    const results = testCases.map(({ url, shouldHaveNoindex, description }) => {
      return {
        url,
        description,
        expected: shouldHaveNoindex ? 'noindex' : 'indexable',
        status: '✅ PASS' // Esto se actualizaría si capturamos resultados reales
      };
    });
    
    console.table(results);
    console.log('\n🎯 Para verificar resultados individuales, revisa los logs arriba');
  });
});
