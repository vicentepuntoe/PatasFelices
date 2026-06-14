export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" aria-hidden />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Refugio sin fines de lucro · Chile</p>
          <h1>
            Ellos no pueden pedir ayuda,{' '}
            <span className="text-highlight">pero tú sí puedes darla</span>
          </h1>
          <p className="lead">
            PatasFelices rescata perros y gatos abandonados, los rehabilita y les
            busca familia. Cada donación se transforma en comida, medicina y
            esperanza — y la mostramos con total transparencia.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary btn--large" href="#donar">
              Hacer una donación
            </a>
            <a className="btn btn--ghost btn--large" href="#transparencia">
              Ver cómo usamos el dinero
            </a>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>127</strong>
              <span>rescatados este año</span>
            </li>
            <li>
              <strong>89</strong>
              <span>adopciones exitosas</span>
            </li>
            <li>
              <strong>100%</strong>
              <span>donaciones trazables</span>
            </li>
          </ul>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=85"
            alt="Persona abrazando a un perro rescatado"
            width={540}
            height={640}
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
