import { animalGallery } from '../data/content'

export function Mission() {
  return (
    <section className="section mission" id="mision">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Nuestra misión</p>
          <h2>Salvar vidas con dignidad, cariño y cuentas claras</h2>
          <p>
            No somos una plataforma anónima: somos vecinos, veterinarios y
            voluntarios que viven el rescate día a día. Tu donación no desaparece
            en un fondo general: la vinculamos a gastos reales y los publicamos.
          </p>
        </div>
        <div className="mission-cards">
          <article className="card">
            <h3>Rescate y cuidado</h3>
            <p>
              Recibimos animales en situación de calle, maltrato o abandono. Les
              damos refugio, alimento y tratamiento veterinario hasta que estén
              listos para un hogar.
            </p>
          </article>
          <article className="card card--accent">
            <h3>Transparencia radical</h3>
            <p>
              Por cada donativo registramos monto, fecha y destino. Subimos
              boletas, facturas o comprobantes para que veas exactamente en qué
              se usó tu aporte.
            </p>
          </article>
          <article className="card">
            <h3>Adopción responsable</h3>
            <p>
              Entrevistamos familias, hacemos seguimiento y priorizamos el
              bienestar animal. Donar también financia castraciones y microchip
              antes de cada adopción.
            </p>
          </article>
        </div>
        <div className="gallery" id="impacto">
          {animalGallery.map((item) => (
            <figure key={item.src} className="gallery-item">
              <img src={item.src} alt={item.alt} loading="lazy" width={400} height={300} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
