import { howItWorksSteps } from '../data/content'
import { HelpedAnimals } from './HelpedAnimals'

export function Mission() {
  return (
    <>
      <section className="section how-it-works" id="como-funciona">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Cómo funciona</p>
            <h2>De tu transferencia al comprobante, paso a paso</h2>
            <p>
              Así conectamos cada donación con lo que ocurre después: nada de cajas
              negras, solo un flujo claro que puedes seguir en esta misma página.
            </p>
          </div>
          <ol className="how-steps">
            {howItWorksSteps.map((item) => (
              <li key={item.step} className="how-step card">
                <span className="how-step-number" aria-hidden>
                  {item.step}
                </span>
                <div className="how-step-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="how-steps-foot">
            Prueba el flujo en acción{' '}
            <a href="#donar">donando</a>{' '}
            y, si ya donaste, refresca la página para ver el{' '}
            <a
              href="#historial-transferencias"
              onClick={(e) => {
                e.preventDefault()
                window.location.hash = 'historial-transferencias'
                window.location.reload()
              }}
            >
              historial de transferencias
            </a>
            .
          </p>
        </div>
      </section>

      <HelpedAnimals />
    </>
  )
}
