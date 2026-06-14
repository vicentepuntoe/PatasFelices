const helpedAnimalsPhotos = [
  {
    id: 'cachorros-racion',
    src: '/images/animales-ayudados/cachorros-alimentandose.png',
    alt: 'Cachorros golden comiendo juntos de un plato en el refugio',
    caption: 'Ración diaria cubierta con aportes del libro de transparencia.',
  },
  {
    id: 'perros-patio',
    src: '/images/animales-ayudados/perros-comiendo.png',
    alt: 'Varios perros comiendo alimento en el patio del refugio',
    caption: 'Alimento comprado tras donaciones confirmadas vía Khipu (ejemplo).',
  },
  {
    id: 'alimentacion-calle',
    src: '/images/animales-ayudados/mujer-alimentando-perro.png',
    alt: 'Persona alimentando a un perro callejero en la acera',
    caption: 'También llegamos a quienes esperan una ración en la calle (ejemplo).',
  },
] as const

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
        <ul className="helped-animals-gallery">
          {helpedAnimalsPhotos.map((item) => (
            <li key={item.id}>
              <figure className="gallery-item">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <figcaption>{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="helped-animals-note">
          Cuando publiquemos gastos en alimento, podremos enlazar cada comprobante
          con historias como estas.
        </p>
      </div>
    </section>
  )
}
