# Configuración de Frontend para Vercel

## Variables de Entorno

### Desarrollo (Local)
Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_RENDER_URL=http://localhost:3000/render
```

### Producción (Vercel)
Configura estas variables en el dashboard de Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables:

```
VITE_API_URL=https://tu-api-url.onrender.com/api
VITE_RENDER_URL=https://tu-api-url.onrender.com/render
```

**Nota**: Reemplaza `tu-api-url.onrender.com` con la URL real de tu API en Render.

## Arquitectura de Comunicación

### Usuario Normal (SPA)
```
Usuario → Vercel (Frontend) → API Render (JSON) → Supabase
```

### Bot (SEO)
```
Bot → Vercel → Cloudflare → API Render (/render/*) → HTML estático → Supabase
```

## Rutas del Frontend

Las rutas del frontend coinciden con las rutas de contenido de la API:

| Ruta Frontend | Página | Endpoint API |
|---------------|--------|--------------|
| `/` | Home | `GET /api/media` |
| `/pelicula/:slug` | Detalle película | `GET /api/media/:slug` |
| `/serie/:slug` | Detalle serie | `GET /api/media/:slug` |
| `/genero/:slug` | Género | `GET /api/genres/:slug` |
| `/articulo/:slug` | Artículo | `GET /api/article/:slug` |
| `/actor/:slug` | Actor | `GET /api/person/:slug` |

## Flujo de Datos

### 1. Usuario accede a `/pelicula/inception`
1. React Router carga `MoviePage`
2. `MoviePage` hace fetch a `/api/media/inception`
3. API retorna JSON con datos de la película
4. React renderiza la información

### 2. Bot accede a `/pelicula/inception`
1. `botMiddleware` en la API detecta que es bot
2. Redirige a `/render/pelicula/inception`
3. `renderRoutes` genera HTML completo con SEO
4. Bot recibe HTML (sin necesidad de ejecutar JS)

## Deploy en Vercel

### Opción 1: Desde GitHub (Recomendado)
1. Sube tu código a GitHub
2. Ve a Vercel → Add New Project
3. Selecciona tu repositorio
4. Configura:
   - Framework Preset: Vite
   - Root Directory: `./web`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Agrega las variables de entorno
6. Deploy

### Opción 2: Desde Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd web
vercel
```

## Configuración de vercel.json (Opcional)

Crea `vercel.json` en la raíz de `web/` para configuraciones avanzadas:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://tu-api-url.onrender.com/api/:path*"
    },
    {
      "source": "/render/:path*",
      "destination": "https://tu-api-url.onrender.com/render/:path*"
    }
  ]
}
```

## Configuración de DNS

Para usar tu dominio personalizado:

1. En Vercel: Settings → Domains → Add Domain
2. Agrega `vimovies.com`
3. Vercel te dará instrucciones DNS
4. En tu proveedor de DNS, agrega:
   - Tipo: CNAME
   - Nombre: `@` (o tu subdominio)
   - Valor: `cname.vercel-dns.com`

## Testing Local

```bash
# Instalar dependencias
pnpm install

# Iniciar desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview
```

## Troubleshooting

### Error: CORS
Si tienes errores de CORS, asegúrate de que en tu API (`api-control/src/index.ts`) el CORS esté configurado correctamente:

```typescript
app.use('*', cors({
  origin: ['https://vimovies.com', 'https://tu-vercel-url.vercel.app'],
  credentials: true
}))
```

### Error: Variables de entorno no disponibles
Recuerda que las variables de entorno en Vite deben empezar con `VITE_`. Si no empiezan así, no estarán disponibles en el cliente.

### Imágenes no cargan
Asegúrate de que las URLs de imágenes de TMDB sean correctas:
- Base URL: `https://image.tmdb.org/t/p/`
- Tamaños: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`

## Próximos Pasos

1. Configurar las variables de entorno en Vercel
2. Deploy a Vercel
3. Configurar dominio personalizado
4. Probar que las rutas funcionan correctamente
5. Verificar que la API responde correctamente
6. Testear con Googlebot para verificar SEO
