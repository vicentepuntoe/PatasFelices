import { LegalPage } from '../components/LegalPage'
import { siteLegal, siteRequiresCookieConsent } from '../data/siteLegal'

export function CookiesPage() {
  const L = siteLegal
  const optionalTech = L.usesTurnstile || L.usesAnalytics

  return (
    <LegalPage title="Política de cookies y tecnologías similares">
      <p className="legal-lead">
        En <strong>{L.brandName}</strong> describimos qué tecnologías usan tu
        navegador o dispositivo al visitar el sitio. Este documento complementa
        la <a href={L.paths.privacy}>Política de privacidad</a> y los{' '}
        <a href={L.paths.terms}>Términos de donación</a>.
      </p>

      <section>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que un sitio puede guardar en tu
          navegador. También existen tecnologías similares: almacenamiento local
          (<code>localStorage</code>), píxeles de seguimiento e identificadores en
          solicitudes de red.
        </p>
      </section>

      <section>
        <h2>2. Qué usamos en este sitio hoy</h2>
        <p>
          En la configuración actual de <strong>{L.brandName}</strong>{' '}
          <strong>no instalamos cookies propias</strong> de analítica, publicidad ni
          seguimiento. Tampoco usamos herramientas como Google Analytics ni
          Cloudflare Turnstile. Por eso{' '}
          <strong>no verás un banner de consentimiento de cookies</strong> al
          entrar.
        </p>
        <p>
          Los datos que ingresas al donar (monto, nombre opcional, mensaje) se
          envían al pulsar el formulario y se rigen por la{' '}
          <a href={L.paths.privacy}>Política de privacidad</a>; no los recogemos
          mediante cookies en la página de inicio.
        </p>
        <ul>
          <li>
            <strong>Navegación y transparencia:</strong> el historial de pagos se
            actualiza consultando nuestro servidor (y, si está configurado,
            tiempo real); eso no requiere cookies propias en tu navegador para
            funcionar.
          </li>
          <li>
            <strong>Khipu:</strong> al pagar, Khipu y tu banco pueden usar cookies
            o almacenamiento propios según sus políticas. No controlamos esas
            tecnologías.
          </li>
          <li>
            <strong>Hosting ({L.hostingProvider}):</strong> puede registrar IP y
            metadatos de la solicitud en logs del servidor; no siempre implica
            cookies en el cliente.
          </li>
          {!optionalTech && (
            <li>
              <strong>Preferencias de cookies:</strong> no guardamos en tu
              dispositivo ninguna clave de consentimiento porque no hay cookies
              opcionales que gestionar.
            </li>
          )}
        </ul>
      </section>

      {L.usesTurnstile && (
        <section>
          <h2>3. Cloudflare Turnstile</h2>
          <p>
            Usamos Turnstile para reducir bots en el formulario de donación.
            Cloudflare puede procesar datos técnicos e interactuar con
            almacenamiento del navegador. Consulta la documentación y avisos de
            privacidad de Cloudflare Turnstile al configurar el servicio.
          </p>
        </section>
      )}

      {L.usesAnalytics && L.analyticsProvider && (
        <section>
          <h2>{L.usesTurnstile ? '4' : '3'}. Analítica web</h2>
          <p>
            Utilizamos {L.analyticsProvider} para entender uso agregado del sitio
            (páginas visitadas, dispositivo aproximado). Al activar esta
            herramienta, mostramos un aviso la primera vez que nos visitas y, si
            aceptas, podemos guardar tu elección en{' '}
            <code>localStorage</code> (clave <code>pf-cookie-consent</code>).
          </p>
        </section>
      )}

      <section>
        <h2>{optionalTech ? 'Gestión de preferencias' : '3. Gestión de preferencias'}</h2>
        <p>
          Puedes bloquear o eliminar cookies y datos de sitios desde la
          configuración de tu navegador. Si desactivas cookies que Khipu o tu
          banco consideren necesarias, es posible que no puedas completar el pago
          en línea.
        </p>
        {siteRequiresCookieConsent() ? (
          <p>
            Si ya respondiste al banner de cookies, tu elección queda guardada en
            este navegador hasta que borres los datos del sitio.
          </p>
        ) : (
          <p>
            Si en el futuro activamos analítica u otras cookies opcionales,
            actualizaremos esta política y mostraremos un aviso de consentimiento
            antes de usarlas.
          </p>
        )}
      </section>

      <section>
        <h2>{optionalTech ? 'Contacto' : '4. Contacto'}</h2>
        <p>
          Dudas sobre cookies o tecnologías similares:{' '}
          <a href={`mailto:${L.privacyEmail}`}>{L.privacyEmail}</a>.
        </p>
      </section>

      <p className="legal-disclaimer">
        Revisa este texto cuando cambies herramientas de medición, captcha o
        proveedores de hosting en tu despliegue.
      </p>
    </LegalPage>
  )
}
