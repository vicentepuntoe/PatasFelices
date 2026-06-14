import { useEffect, useState } from 'react'
import { siteLegal, siteRequiresCookieConsent } from '../data/siteLegal'
import { hasAnsweredCookieConsent, setCookieConsent } from '../lib/cookies'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!siteRequiresCookieConsent()) return
    if (!hasAnsweredCookieConsent()) {
      setVisible(true)
    }
  }, [])

  if (!siteRequiresCookieConsent() || !visible) {
    return null
  }

  function dismiss(choice: 'accepted' | 'rejected') {
    setCookieConsent(choice)
    setVisible(false)
  }

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent-inner container">
        <div className="cookie-consent-copy">
          <p id="cookie-consent-title" className="cookie-consent-title">
            Cookies en {siteLegal.brandName}
          </p>
          <p id="cookie-consent-desc" className="cookie-consent-desc">
            Usamos cookies o tecnologías similares para medir el uso del sitio y
            mejorar la experiencia. Puedes leer el detalle en nuestra{' '}
            <a href={siteLegal.paths.cookies}>Política de cookies</a>.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={() => dismiss('rejected')}
          >
            Solo necesarias
          </button>
          <button
            type="button"
            className="btn btn--primary btn--small"
            onClick={() => dismiss('accepted')}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
