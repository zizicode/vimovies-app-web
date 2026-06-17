# SEO Testing with Playwright

## Overview

Automated testing suite to verify that `noindex` meta tags are correctly implemented for 404/invalid resources while allowing indexing for valid content.

## Setup

### 1. Install Dependencies

```bash
# Install Playwright
pnpm add -D @playwright/test

# Install browser binaries
pnpm run test:install
```

### 2. Environment Configuration

Copy the test environment file:
```bash
cp .env.test .env
```

Edit `.env` to set your testing target:
- **Local testing**: `BASE_URL=http://localhost:4173`
- **Production testing**: `BASE_URL=https://vimovies.com`

### 3. Start Local Server (for local testing)

```bash
# Build and start preview server
pnpm run build
pnpm run preview
```

## Running Tests

### Basic SEO Test
```bash
# Run all SEO tests
pnpm run test:seo

# Run with debug mode (opens browser)
pnpm run test:seo:debug
```

### Test Cases

The test suite covers these scenarios:

#### 🔒 URLs que DEBEN tener `noindex`:
- `/cast/yoyo-mung-ka-wai/?letter=0-9` - Ruta inválida heredada
- `/pelicula/slug-que-no-existe-12345` - Película 404
- `/serie/slug-inexistente-99999` - Serie 404
- `/articulo/articulo-inexistente` - Artículo 404
- `/persona/persona-inexistente` - Persona 404
- `/genero/genero-inexistente` - Género 404
- `/asdkjaslkdj` - Ruta aleatoria

#### ✅ URLs que NO deben tener `noindex`:
- `/` - Home page
- `/pelicula/oppenheimer` - Película real (TODO: verificar slug)
- `/genero/accion` - Género real (TODO: verificar slug)
- `/peliculas` - Lista de películas
- `/actores` - Lista de actores

## Expected Results

### ✅ Valid 404 Pages
```html
<meta name="robots" content="noindex, nofollow">
```

### ✅ Valid Indexable Pages
Either no meta robots tag OR:
```html
<meta name="robots" content="index, follow">
```

## Test Output

The test provides:
- ✅ Individual test results for each URL
- 📊 Summary table with all results
- 🐛 Debug information for failures

## Troubleshooting

### Common Issues

1. **Test fails because page loads slowly**
   - Increase timeout in `waitForLoadState()`
   - Check if API endpoints are responding

2. **Meta tag not found**
   - Verify `react-helmet-async` is working
   - Check if `ResourceValidator` is properly implemented
   - Ensure page has fully hydrated

3. **Local server not accessible**
   - Verify preview server is running on port 4173
   - Check if build completed successfully

### Debug Mode

Run tests with browser visibility:
```bash
pnpm run test:seo:debug
```

This opens a browser window where you can:
- See exactly what the test sees
- Inspect the DOM manually
- Check network requests
- Verify meta tag injection

## Continuous Integration

Add to your CI pipeline:

```yaml
# Example GitHub Actions
- name: Setup Playwright
  run: |
    pnpm install
    pnpm run test:install
    
- name: Run SEO Tests
  run: pnpm run test:seo
  env:
    BASE_URL: https://vimovies.com
```

## Updating Test Cases

To add new test cases, edit `tests/seo-noindex.spec.ts`:

```typescript
{
  url: '/new-test-url',
  shouldHaveNoindex: true, // or false
  description: 'Description of what this test verifies'
}
```

## Production Verification

After deployment:

1. Run tests against production:
   ```bash
   BASE_URL=https://vimovies.com pnpm run test:seo
   ```

2. Manual verification with browser dev tools:
   - Open URL
   - Check Elements tab → Head section
   - Verify `<meta name="robots" content="...">`

3. Google Search Console:
   - Monitor "Crawled - currently not indexed" count
   - Should decrease over time as 404s get noindex
