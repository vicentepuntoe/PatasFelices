import { animalGallery, howItWorksSteps } from '../data/content'
import { HeroImpactStats } from './HeroImpactStats'

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
            <a className="btn btn--small btn--primary how-steps-foot-donate" href="#donar">
              donando
            </a>{' '}
            y, si ya donaste,{' '}
            <a
              href="#historial-transferencias"
              onClick={(e) => {
                e.preventDefault()
                window.location.hash = 'historial-transferencias'
                window.location.reload()
              }}
            >
              refresca la página
            </a>{' '}
            para ver el historial de transferencias.
          </p>
        </div>
      </section>

      <section className="section impact" id="impacto">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Impacto</p>
            <h2>Lo que logramos juntos, en fotos y en cifras</h2>
            <p>
              Cada aporte se traduce en rescates, adopciones y cuentas claras.
              Estas historias y números son parte de lo que tu donación hace posible.
            </p>
          </div>
          <div className="gallery">
            {animalGallery.map((item, index) =>
              index === 1 ? (
                <figure key="impact-stats" className="gallery-item gallery-item--stats">
                  <HeroImpactStats />
                  <figcaption>
                    Gracias a quienes donan, estos números siguen creciendo.
                  </figcaption>
                </figure>
              ) : (
                <figure key={item.src} className="gallery-item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  )
}
