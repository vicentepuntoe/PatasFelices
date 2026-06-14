import { useEffect, useState } from 'react'
import { thankYouMoments } from '../data/content'
import {
  getKhipuPaymentStatus,
  isKhipuPaymentConfirmed,
  isKhipuPaymentFailed,
  readPaymentIdFromReturnUrl,
} from '../services/khipu'
import { registerDonationAfterPayment } from '../services/donations'

const POLL_INTERVAL_MS = 10_000
const MAX_POLL_ATTEMPTS = 18

type ViewKind =
  | 'loading'
  | 'pending'
  | 'confirmed'
  | 'failed'
  | 'missing-id'
  | 'error'

type ViewState =
  | { kind: Exclude<ViewKind, 'error'> }
  | { kind: 'error'; message: string }

function momentKey(kind: ViewKind): keyof typeof thankYouMoments {
  if (kind === 'missing-id') return 'missingId'
  return kind
}

export function ThankYou() {
  const [view, setView] = useState<ViewState>({ kind: 'loading' })

  useEffect(() => {
    const paymentId = readPaymentIdFromReturnUrl()

    if (!paymentId) {
      setView({ kind: 'missing-id' })
      return
    }

    let cancelled = false
    let attempts = 0
    let timer: ReturnType<typeof setTimeout> | undefined

    async function checkStatus() {
      if (cancelled) return

      try {
        const payment = await getKhipuPaymentStatus(paymentId!)
        if (cancelled) return

        if (isKhipuPaymentConfirmed(payment.status)) {
          try {
            await registerDonationAfterPayment(paymentId!)
          } catch {
            /* el webhook puede registrar después; no bloqueamos la UI */
          }
          setView({ kind: 'confirmed' })
          return
        }

        if (isKhipuPaymentFailed(payment.status)) {
          setView({ kind: 'failed' })
          return
        }

        attempts += 1
        if (attempts >= MAX_POLL_ATTEMPTS) {
          setView({ kind: 'pending' })
          return
        }

        setView({ kind: 'pending' })
        timer = setTimeout(checkStatus, POLL_INTERVAL_MS)
      } catch (err) {
        if (cancelled) return
        setView({
          kind: 'error',
          message:
            err instanceof Error
              ? err.message
              : 'No pudimos consultar el estado del pago.',
        })
      }
    }

    void checkStatus()

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [])

  const moment = thankYouMoments[momentKey(view.kind)]
  const showHome =
    view.kind === 'confirmed' ||
    view.kind === 'pending' ||
    view.kind === 'missing-id' ||
    view.kind === 'error'
  const confirmedMoment =
    view.kind === 'confirmed' ? thankYouMoments.confirmed : null

  return (
    <section className="thank-you">
      <div className="container thank-you-grid">
        <div className="thank-you-visual">
          <img
            className="thank-you-photo thank-you-photo--main"
            src={moment.src}
            alt={moment.alt}
            width={520}
            height={420}
            loading="eager"
          />
          {confirmedMoment?.secondarySrc && (
            <img
              className="thank-you-photo thank-you-photo--accent"
              src={confirmedMoment.secondarySrc}
              alt={confirmedMoment.secondaryAlt}
              width={220}
              height={180}
              loading="lazy"
            />
          )}
          {view.kind === 'loading' && (
            <p className="thank-you-visual-caption" aria-live="polite">
              Verificando tu pago…
            </p>
          )}
        </div>

        <div className="thank-you-copy">
          <p className="eyebrow">{moment.eyebrow}</p>
          <h1>{moment.title}</h1>
          {moment.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          {'signOff' in moment && moment.signOff && (
            <p className="thank-you-signoff">{moment.signOff}</p>
          )}
          {view.kind === 'error' && (
            <p className="thank-you-error-detail" role="alert">
              {view.message}
            </p>
          )}

          <div className="thank-you-actions">
            {view.kind === 'failed' && (
              <a className="btn btn--primary" href="/#donar">
                Intentar donar otra vez
              </a>
            )}
            {showHome && (
              <a className="btn btn--primary" href="/">
                Volver al inicio
              </a>
            )}
            {(view.kind === 'confirmed' || view.kind === 'pending') && (
              <a className="btn btn--ghost" href="/#transparencia">
                Ver transparencia
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
