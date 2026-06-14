import { LegalPage } from '../components/LegalPage'
import { siteLegal } from '../data/siteLegal'

export function CookiesPage() {
  const L = siteLegal
  return (
    <LegalPage title="Política de cookies y tecnologías similares">
      <p className="legal-lead">
        En <strong>{L.brandName}</strong> usamos o podemos usar tecnologías que
        almacenan o acceden a información en tu dispositivo. Esta política
        complementa la <a href="/privacidad">Política de privacidad</a>.
      </p>

      <section>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que un sitio guarda en tu navegador.
          También existen tecnologías similares (almacenamiento local, píxeles,
          identificadores en solicitudes de red).
        </p>
      </section>

      <section>
        <h2>2. Qué usamos hoy en este despliegue</h2>
        <ul>
          <li>
            <strong>Funcionamiento del sitio:</strong> el formulario de donación
            no depende de cookies propias para recordar tu sesión; la navegación
            es principalmente estática hasta que inicias el pago.
          </li>
          <li>
            <strong>Khipu:</strong> al ser redirigido a la pasarela de pago,
            Khipu y tu banco pueden usar cookies o almacenamiento propios según
            sus políticas. No controlamos esas tecnologías.
          </li>
          <li>
            <strong>Proveedor de hosting ({L.hostingProvider}):</strong> puede
            registrar solicitudes (incluida IP) en logs; no siempre implica
            cookies en el navegador, pero es tratamiento de datos técnicos.
          </li>
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
            (páginas visitadas, dispositivo aproximado). Puedes limitar cookies
            desde la configuración de tu navegador o extensiones de bloqueo,
            sabiendo que algunas funciones de medición dejarán de operar.
          </p>
        </section>
      )}

      <section>
        <h2>
          {L.usesTurnstile || L.usesAnalytics ? 'Gestión' : '3. Gestión'} de
          preferencias
        </h2>
        <p>
          Puedes bloquear o eliminar cookies desde la configuración de tu
          navegador. Si desactivas cookies estrictamente necesarias de terceros
          (por ejemplo en Khipu), es posible que no puedas completar el pago en
          línea.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          Dudas sobre esta política:{' '}
          <a href={`mailto:${L.privacyEmail}`}>{L.privacyEmail}</a>.
        </p>
      </section>

      <p className="legal-disclaimer">
        Actualiza <code>siteLegal.ts</code> (flags <code>usesTurnstile</code> y{' '}
        <code>usesAnalytics</code>) cuando actives esas herramientas para que este
        texto refleje la realidad del sitio.
      </p>
    </LegalPage>
  )
}
