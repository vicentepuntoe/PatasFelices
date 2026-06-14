export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">PatasFelices</p>
          <p>Rescatamos con el corazón, rendimos cuentas con hechos.</p>
        </div>
        <div className="footer-links">
          <a href="#transparencia">Transparencia</a>
          <a href="#donar">Donar</a>
          <a href="mailto:hola@patasfelices.cl">hola@patasfelices.cl</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} PatasFelices · Hecho con amor por los animales</p>
      </div>
    </footer>
  )
}
