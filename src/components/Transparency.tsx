import { transparencyLedger } from '../data/content'
import { LiveTransfers } from './LiveTransfers'

function formatCLP(amount: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso + 'T12:00:00'))
}

export function Transparency() {
  return (
    <section className="section transparency" id="transparencia">
      <div className="container transparency-grid">
        <div className="transparency-intro">
          <p className="eyebrow">Transparencia</p>
          <h2>Cada peso tiene nombre, fecha y comprobante</h2>
          <p>
            Cuando donas con Khipu, registramos el pago en nuestro libro abierto en
            tiempo real. Abajo ves cada transferencia confirmada; al recargar la
            página sigue ahí.
          </p>
          <ol className="transparency-steps">
            <li>
              <strong>1. Llega tu donación</strong> — confirmación automática vía
              Khipu.
            </li>
            <li>
              <strong>2. Asignamos el gasto</strong> — veterinaria, alimento,
              medicamentos o emergencia.
            </li>
            <li>
              <strong>3. Publicamos el comprobante</strong> — visible para todos,
              sin datos sensibles de donantes.
            </li>
          </ol>
        </div>
        <div className="transparency-live-stack">
          <LiveTransfers />
          <div className="ledger">
          <h3 className="ledger-title">Últimas asignaciones (ejemplo)</h3>
          <ul className="ledger-list">
            {transparencyLedger.map((entry) => (
              <li key={entry.id} className="ledger-row">
                <div className="ledger-row-top">
                  <span className="ledger-date">{formatDate(entry.date)}</span>
                  <span className="ledger-amount">{formatCLP(entry.amount)}</span>
                </div>
                <p className="ledger-donor">{entry.donorLabel}</p>
                <p className="ledger-allocation">{entry.allocation}</p>
                <p className="ledger-receipt">{entry.receiptNote}</p>
              </li>
            ))}
          </ul>
          <p className="ledger-note">
            ¿Quieres que tu donación aparezca con tu nombre? Escríbelo al donar;
            si prefieres anonimato, lo respetamos siempre.
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}
