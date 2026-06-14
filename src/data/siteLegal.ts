/**
 * Datos del responsable del sitio. Complétalos antes de producción.
 * Los textos legales interpolan estos valores.
 */
export const siteLegal = {
  brandName: 'PatasFelices',
  /** Razón social o nombre del titular (persona natural o jurídica). */
  legalName: 'PENDIENTE — Razón social o nombre del titular',
  rut: 'PENDIENTE — RUT del titular',
  address: 'PENDIENTE — Domicilio o región, Chile',
  contactEmail: 'vicente.carrasco.h@gmail.com',
  privacyEmail: 'vicente.carrasco.h@gmail.com',
  /** Proveedor de hosting/CDN (ej. Cloudflare, Vercel, AWS). */
  hostingProvider: 'PENDIENTE — Proveedor de hosting',
  /** Fecha de última actualización de las políticas (ISO). */
  policyLastUpdated: '2026-06-15',
  /** Activa secciones de cookies cuando integres estas herramientas. */
  usesTurnstile: false,
  usesAnalytics: false,
  analyticsProvider: '',
  /** Plazo orientativo para responder solicitudes ARCO (días hábiles). */
  arcoResponseDays: 15,
  /** Días para solicitar reembolso por error de cobro (orientativo). */
  refundRequestDays: 10,
  /** Rutas de documentos legales (footer y formulario de donación). */
  paths: {
    privacy: '/privacidad',
    terms: '/terminos',
    cookies: '/cookies',
  },
} as const

export type SiteLegal = typeof siteLegal

/** Banner de cookies solo si hay tecnologías no esenciales (analítica, Turnstile, etc.). */
export function siteRequiresCookieConsent(
  config: SiteLegal = siteLegal,
): boolean {
  return config.usesAnalytics || config.usesTurnstile
}
