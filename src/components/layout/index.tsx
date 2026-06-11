import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Topbar from './topbar'
import Footer from './footer'
import { PageLoader } from '../pageLoader'
import { useGTM } from '../../hooks/useGTM'

function Layout() {
  const location = useLocation()
  const { trackPageView } = useGTM()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const pageTitle = document.title || 'Vimovies'
    trackPageView(pageTitle, location.pathname)
  }, [location.pathname, trackPageView])

  return (
    <div className="app-layout">
      <Topbar />
      <PageLoader />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout