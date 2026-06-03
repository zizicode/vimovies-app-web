import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from "./lib/i18n/I18nProvider"
// import { useI18n } from "./store/locate.store"
// import { HomePage, MoviePage, SeriesPage, GenrePage } from "./pages"
import MaintenancePage from './pages/MaintenancePage'

// ─── Componente de navegación ─────────────────────────────────────────────────────
// function Navigation() {
//   const { locale, setLocale } = useI18n()

//   return (
//     <nav style={{ padding: "20px", borderBottom: "1px solid #ddd", marginBottom: "20px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       <div>
//         <Link to="/" style={{ marginRight: "20px", textDecoration: "none", color: "#0a0a0b" }}>
//           Inicio
//         </Link>
//         <Link to="/pelicula/inception" style={{ marginRight: "20px", textDecoration: "none", color: "#0a0a0b" }}>
//           Ejemplo Película
//         </Link>
//         <Link to="/genero/accion" style={{ textDecoration: "none", color: "#0a0a0b" }}>
//           Ejemplo Género
//         </Link>
//       </div>
      
//       <button
//         onClick={() => setLocale(locale === "es" ? "en" : "es")}
//         style={{
//           padding: "8px 16px",
//           background: "#e8a030",
//           color: "#0a0a0b",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//           fontWeight: "600"
//         }}
//       >
//         {locale === "es" ? "English" : "Español"}
//       </button>
//     </nav>
//   )
// }

// ─── Componente de ejemplo que usa el sistema i18n ─────────────────────────────
function AppContent() {
  return (
    <div style={{ fontFamily: "Raleway, sans-serif" }}>
      <Routes>
        <Route path="/*" element={<MaintenancePage />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* Spanish routes */}
        {/* <Route path="/pelicula/:slug" element={<MoviePage />} />
        <Route path="/serie/:slug" element={<SeriesPage />} />
        <Route path="/genero/:slug" element={<GenrePage />} /> */}
        {/* English routes */}
        {/* <Route path="/movie/:slug" element={<MoviePage />} />
        <Route path="/tv-show/:slug" element={<SeriesPage />} />
        <Route path="/genre/:slug" element={<GenrePage />} /> */}
      </Routes>
    </div>
  )
}

// ─── App principal con I18nProvider y Router ──────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </BrowserRouter>
  )
}

export default App