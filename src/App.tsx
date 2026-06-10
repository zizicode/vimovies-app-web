import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from "./lib/i18n/I18nProvider"
import { AppRouter } from "./router"
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </I18nProvider>
    </BrowserRouter>
  )
}

export default App