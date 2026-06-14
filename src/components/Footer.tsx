import { siteLegal } from '../data/siteLegal'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">PatasFelices</p>
          <p>Rescatamos con el corazón, rendimos cuentas con hechos.</p>
        </div>
        <div className="footer-links">
          <a href="/#transparencia">Transparencia</a>
          <a href="/#donar">Donar</a>
          <a href={siteLegal.paths.privacy}>Política de privacidad</a>
          <a href={siteLegal.paths.terms}>Términos de donación</a>
          <a href={siteLegal.paths.cookies}>Política de cookies</a>
          <a href={`mailto:${siteLegal.contactEmail}`}>{siteLegal.contactEmail}</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} PatasFelices · Hecho con amor por los animales</p>
      </div>
    </footer>
  )
}
