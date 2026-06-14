import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Mission } from './components/Mission'
import { Transparency } from './components/Transparency'
import { DonateSection } from './components/DonateSection'
import { ThankYou } from './components/ThankYou'

function App() {
  const isThankYouPage = window.location.pathname === '/donacion/gracias'

  if (isThankYouPage) {
    return (
      <div className="app">
        <ThankYou />
        <Footer />
      </div>
    )
  }

  return (
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
  )
}

export default App
