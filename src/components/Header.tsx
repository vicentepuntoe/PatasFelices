import { useEffect, useState } from 'react'

const links = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#transparencia', label: 'Transparencia' },
  { href: '#impacto', label: 'Impacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#inicio">
          <span className="brand-mark" aria-hidden>
            🐾
          </span>
          <span>
            Patas<span className="brand-accent">Felices</span>
          </span>
        </a>
        <nav className="nav" aria-label="Principal">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--small btn--primary" href="#donar">
          Donar ahora
        </a>
      </div>
    </header>
  )
}
