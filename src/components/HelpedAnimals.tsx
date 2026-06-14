import { helpedAnimalsExamples } from '../data/content'

export function HelpedAnimals() {
  return (
    <section className="section helped-animals" id="animales-ayudados">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Animales ayudados</p>
          <h2>Así se ve cuando tus aportes se convierten en alimento</h2>
          <p>
            Estas fotos son <strong>ejemplos ilustrativos</strong> de perros siendo
            alimentados con fondos como los que registramos en cobros y gastos. El
            impacto real lo ves en el historial de pagos y en los comprobantes
            publicados.
          </p>
        </div>
        <div className="helped-animals-gallery">
          {helpedAnimalsExamples.map((item) => (
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
          ))}
        </div>
        <p className="helped-animals-note">
          Cuando publiquemos gastos en alimento, podremos enlazar cada comprobante
          con historias como estas.
        </p>
      </div>
    </section>
  )
}
