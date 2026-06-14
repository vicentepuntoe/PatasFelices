import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Mission } from './components/Mission'
import { Transparency } from './components/Transparency'
import { DonateSection } from './components/DonateSection'
import { ThankYou } from './components/ThankYou'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { CookiesPage } from './pages/CookiesPage'

const legalRoutes: Record<string, () => React.ReactNode> = {
  '/privacidad': () => <PrivacyPage />,
  '/terminos': () => <TermsPage />,
  '/cookies': () => <CookiesPage />,
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  const Legal = legalRoutes[path]
  if (Legal) {
    return (
      <>
        <CookieConsent />
        {Legal()}
      </>
    )
  }

  if (path === '/donacion/gracias' || path === '/gracias') {
    return (
      <>
        <CookieConsent />
        <div className="app">
          <ThankYou />
          <Footer />
        </div>
      </>
    )
  }

  return (
    <>
      <CookieConsent />
      <div className="app">
        <Header />
        <main>
          <Hero />
          <Mission />
          <Transparency />
          <DonateSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
