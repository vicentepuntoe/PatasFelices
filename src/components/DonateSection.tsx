import { useState } from 'react'
import { donationPresets } from '../data/content'
import { createKhipuPayment } from '../services/khipu'
import { siteLegal } from '../data/siteLegal'

function formatCLP(amount: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState(donationPresets[1].amount)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [message, setMessage] = useState('')
  const [acceptedLegal, setAcceptedLegal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const effectiveAmount = customAmount.trim()
    ? Number(customAmount.replace(/\D/g, ''))
    : selectedAmount

  const selectedPreset = donationPresets.find((p) => p.amount === selectedAmount)

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!Number.isFinite(effectiveAmount) || effectiveAmount < 1000) {
      setError('El monto mínimo es $1.000 CLP.')
      return
    }

    if (!acceptedLegal) {
      setError('Debes aceptar los términos, la privacidad y la política de cookies para continuar.')
      return
    }

    setLoading(true)
    try {
      const payment = await createKhipuPayment({
        amount: effectiveAmount,
        donorName: donorName.trim() || undefined,
        message: message.trim() || undefined,
      })
      window.location.href = payment.paymentUrl
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos conectar con la pasarela. Intenta de nuevo.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section donate" id="donar">
      <div className="container donate-grid">
        <div className="donate-copy">
          <p className="eyebrow">Donar</p>
          <h2>Hoy puedes cambiar el día de alguien que solo tiene cuatro patas</h2>
          <p>
            Pago seguro con <strong>Khipu</strong>. Sin crear cuenta en nuestra
            web: eliges el monto, completas el pago en Khipu y vuelves aquí con
            la confirmación.
          </p>
          <img
            className="donate-photo"
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&q=80"
            alt="Cachorro mirando con esperanza"
            width={480}
            height={320}
            loading="lazy"
          />
        </div>
        <form className="donate-form card card--elevated" onSubmit={handleDonate}>
          <h3>Elige tu aporte</h3>
          <div className="amount-grid">
            {donationPresets.map((preset) => (
              <button
                key={preset.amount}
                type="button"
                className={`amount-chip ${selectedAmount === preset.amount && !customAmount ? 'amount-chip--active' : ''}`}
                onClick={() => {
                  setSelectedAmount(preset.amount)
                  setCustomAmount('')
                }}
              >
                <span className="amount-chip-value">{preset.label}</span>
                <span className="amount-chip-impact">{preset.impact}</span>
              </button>
            ))}
          </div>
          {selectedPreset && !customAmount && (
            <p className="amount-hint">{selectedPreset.impact}</p>
          )}
          <label className="field">
            <span>Otro monto (CLP)</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Ej: 20000"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
          </label>
          <label className="field">
            <span>Tu nombre (opcional)</span>
            <input
              type="text"
              placeholder="Cómo quieres aparecer en transparencia"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              maxLength={80}
            />
          </label>
          <label className="field">
            <span>Mensaje para el equipo (opcional)</span>
            <textarea
              rows={3}
              placeholder="Unas palabras para nuestros rescatados..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
            />
          </label>
          <p className="donate-total">
            Total a donar:{' '}
            <strong>
              {Number.isFinite(effectiveAmount) && effectiveAmount >= 1000
                ? formatCLP(effectiveAmount)
                : '—'}
            </strong>
          </p>
          <label className="field field--checkbox">
            <input
              type="checkbox"
              checked={acceptedLegal}
              onChange={(e) => setAcceptedLegal(e.target.checked)}
            />
            <span>
              He leído y acepto los{' '}
              <a
                href={siteLegal.paths.terms}
                target="_blank"
                rel="noopener noreferrer"
              >
                términos de donación
              </a>
              , la{' '}
              <a
                href={siteLegal.paths.privacy}
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidad
              </a>{' '}
              y la{' '}
              <a
                href={siteLegal.paths.cookies}
                target="_blank"
                rel="noopener noreferrer"
              >
                política de cookies
              </a>
              .
            </span>
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn btn--primary btn--large btn--block"
            disabled={loading}
          >
            {loading ? 'Redirigiendo a Khipu…' : 'Continuar con Khipu'}
          </button>
          <p className="form-footnote">
            Al continuar serás redirigido a la pasarela de pagos Khipu. No
            almacenamos datos de tarjetas ni claves bancarias.
          </p>
        </form>
      </div>
    </section>
  )
}
