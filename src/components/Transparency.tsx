import { useState } from 'react'
import { LiveTransfers } from './LiveTransfers'

const EXPENSES_TOTAL = 0

function formatCLP(amount: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function Transparency() {
  const [incomeTotal, setIncomeTotal] = useState(0)
  const balance = incomeTotal - EXPENSES_TOTAL

  return (
    <section className="section transparency" id="transparencia">
      <div className="container">
        <div className="section-head section-head--center transparency-head">
          <h2>Cada peso tiene nombre, fecha y comprobante</h2>
          <p>
            Cuando donas con Khipu, registramos el pago en nuestro libro abierto.
            A la izquierda ves cada transferencia en tiempo real; a la derecha, los
            gastos publicados. Así comprobamos que lo recaudado y lo gastado cuadran.
          </p>
        </div>

        <div className="transparency-balance card card--elevated" aria-live="polite">
          <div className="transparency-balance-item">
            <span className="transparency-balance-label">Recaudado</span>
            <span className="transparency-balance-value">{formatCLP(incomeTotal)}</span>
          </div>
          <span className="transparency-balance-op" aria-hidden>
            −
          </span>
          <div className="transparency-balance-item">
            <span className="transparency-balance-label">Gastado (publicado)</span>
            <span className="transparency-balance-value">{formatCLP(EXPENSES_TOTAL)}</span>
          </div>
          <span className="transparency-balance-op" aria-hidden>
            =
          </span>
          <div className="transparency-balance-item transparency-balance-item--highlight">
            <span className="transparency-balance-label">Saldo</span>
            <span className="transparency-balance-value">{formatCLP(balance)}</span>
          </div>
        </div>

        <div className="transparency-ledgers">
          <LiveTransfers onIncomeTotalChange={setIncomeTotal} />
          <div className="ledger expense-ledger card card--elevated" id="historial-gastos">
            <div className="ledger-head">
              <h3 className="ledger-title">Historial de gastos</h3>
              <p className="ledger-badge">Comprobantes publicados</p>
            </div>
            <p className="ledger-empty">sin gastos de momento</p>
            <p className="ledger-note">
              Publicamos boletas y facturas cuando asignamos fondos. No se actualiza al
              instante como las donaciones.
            </p>
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
