import { useCallback, useEffect, useState } from 'react'
import { subscribeToDonationInserts } from '../lib/supabaseRealtime'
import { fetchLiveDonations } from '../services/donations'
import type { LiveDonationEntry } from '../types/donation'

const POLL_MS = 5_000

function formatCLP(amount: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function LiveTransfers() {
  const [count, setCount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [donations, setDonations] = useState<LiveDonationEntry[]>([])
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pulse, setPulse] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const snapshot = await fetchLiveDonations()
      setLive(snapshot.live)
      setCount(snapshot.count)
      setTotalAmount(snapshot.totalAmount)
      setDonations((prev) => {
        const prevTop = prev[0]?.id
        const nextTop = snapshot.donations[0]?.id
        if (prevTop && nextTop && prevTop !== nextTop) {
          setPulse(true)
          window.setTimeout(() => setPulse(false), 1200)
        }
        return snapshot.donations
      })
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No pudimos actualizar las transferencias.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
    const poll = window.setInterval(() => void refresh(), POLL_MS)
    const unsubscribeRealtime = subscribeToDonationInserts(() => void refresh())
    return () => {
      window.clearInterval(poll)
      unsubscribeRealtime?.()
    }
  }, [refresh])

  return (
    <div
      id="historial-transferencias"
      className={`live-transfers card ${pulse ? 'live-transfers--pulse' : ''}`}
    >
      <div className="live-transfers-head">
        <div>
          {live && (
            <p className="eyebrow live-transfers-eyebrow">En vivo</p>
          )}
          <h3 className="live-transfers-title">Transferencias que llegan ahora</h3>
        </div>
        <div className="live-transfers-stats" aria-live="polite">
          <div className="live-stat">
            <span className="live-stat-value">{count}</span>
            <span className="live-stat-label">
              {count === 1 ? 'transferencia' : 'transferencias'}
            </span>
          </div>
          <div className="live-stat">
            <span className="live-stat-value">{formatCLP(totalAmount)}</span>
            <span className="live-stat-label">recaudado en vivo</span>
          </div>
        </div>
      </div>

      {loading && <p className="live-transfers-hint">Cargando libro en vivo…</p>}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {!loading && donations.length === 0 && (
        <p className="live-transfers-empty">
          Aún no hay transferencias registradas. Cuando alguien done con Khipu, aparecerá
          aquí al instante (o al recargar la página).
        </p>
      )}

      {donations.length > 0 && (
        <ul className="live-transfers-list">
          {donations.map((entry) => (
            <li key={entry.id} className="live-transfers-row">
              <div className="live-transfers-row-top">
                <span className="live-transfers-time">{formatTime(entry.createdAt)}</span>
                <span className="live-transfers-amount">{formatCLP(entry.amount)}</span>
              </div>
              <p className="live-transfers-donor">{entry.donorLabel}</p>
              <p className="live-transfers-status">Transferencia confirmada vía Khipu</p>
            </li>
          ))}
        </ul>
      )}

      <p className="live-transfers-foot">
        Se actualiza cuando entra una donación nueva. También puedes recargar la
        página para ver la lista al día.
      </p>
    </div>
  )
}
