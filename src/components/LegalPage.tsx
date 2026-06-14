import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { siteLegal } from '../data/siteLegal'

type LegalPageProps = {
  title: string
  children: ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="app">
      <header className="legal-header">
        <div className="container legal-header-inner">
          <a href="/" className="legal-back">
            ← Volver al inicio
          </a>
          <p className="legal-brand">{siteLegal.brandName}</p>
        </div>
      </header>
      <main className="legal-main">
        <article className="container legal-article">
          <h1>{title}</h1>
          <p className="legal-updated">
            Última actualización:{' '}
            {new Date(siteLegal.policyLastUpdated).toLocaleDateString('es-CL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {children}
        </article>
      </main>
      <Footer />
    </div>
  )
}
