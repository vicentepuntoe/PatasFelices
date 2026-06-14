import { LegalPage } from '../components/LegalPage'
import { siteLegal } from '../data/siteLegal'

export function TermsPage() {
  const L = siteLegal
  return (
    <LegalPage title="Términos y condiciones de donación">
      <p className="legal-lead">
        Al usar el sitio <strong>{L.brandName}</strong> y continuar hacia el pago
        con Khipu, aceptas estos términos con <strong>{L.legalName}</strong> (RUT{' '}
        {L.rut}), domicilio en {L.address}.
      </p>

      <section>
        <h2>1. Naturaleza del sitio</h2>
        <p>
          {L.brandName} es un sitio de información y recaudación de{' '}
          <strong>donaciones voluntarias</strong> a favor de la causa animal que
          describe la organización. No vendemos productos ni prestamos servicios
          comerciales a cambio del aporte; la donación no genera una contraprestación
          económica equivalente al monto transferido.
        </p>
      </section>

      <section>
        <h2>2. Quién recibe los fondos</h2>
        <p>
          Los pagos se acreditan a la cuenta de cobrador verificada en{' '}
          <strong>Khipu</strong> asociada a {L.legalName}. Khipu es un tercero
          independiente; su uso está sujeto a los términos y comisiones de Khipu.
        </p>
      </section>

      <section>
        <h2>3. Proceso de donación</h2>
        <ol>
          <li>Eliges el monto (mínimo $1.000 CLP salvo que indiquemos otro).</li>
          <li>
            Opcionalmente indicas nombre para transparencia y un mensaje para el
            equipo.
          </li>
          <li>
            Nuestro servidor crea una solicitud de cobro y te redirige al sitio o
            flujo de pago de Khipu.
          </li>
          <li>
            Completas el pago en Khipu con el medio que allí elijas. La
            confirmación definitiva depende de Khipu y de tu entidad bancaria.
          </li>
          <li>
            Tras un pago exitoso, puedes volver a nuestra página de agradecimiento.
          </li>
        </ol>
        <p>
          No garantizamos disponibilidad ininterrumpida del sitio ni de Khipu; en
          caso de fallas técnicas, intenta nuevamente o contáctanos en{' '}
          <a href={`mailto:${L.contactEmail}`}>{L.contactEmail}</a>.
        </p>
      </section>

      <section>
        <h2>4. Transparencia y publicación del nombre</h2>
        <p>
          Si proporcionas un nombre o pseudónimo, autorizas su uso en el{' '}
          <strong>historial de pagos</strong> visible en el sitio (por ejemplo,
          iniciales o nombre abreviado junto al monto). Si dejas el campo vacío,
          trataremos la donación como anónima en ese registro, sin perjuicio de
          los registros internos y contables que la ley exija.
        </p>
        <p>
          Los <strong>comprobantes de gasto</strong> se publican en el historial
          correspondiente cuando estén disponibles; el saldo entre recaudado y
          gastado publicado se muestra en la sección de transparencia. Las fotos
          de la sección &quot;Animales ayudados&quot; son ejemplos ilustrativos y
          no sustituyen los comprobantes.
        </p>
      </section>

      <section>
        <h2>5. Reembolsos y errores de cobro</h2>
        <p>
          Las donaciones son en principio <strong>no reembolsables</strong>, por
          su carácter voluntario y definitivo una vez acreditadas. Excepción:
          cobros duplicados, montos erróneos por falla técnica evidente o fraude
          reportado a tiempo. Para solicitar revisión, escribe a{' '}
          <a href={`mailto:${L.contactEmail}`}>{L.contactEmail}</a> dentro de{' '}
          {L.refundRequestDays} días desde el cargo, adjuntando comprobante de
          Khipu o de tu banco. Evaluaremos cada caso; los reembolsos efectivos,
          si proceden, se gestionarán según las políticas de Khipu y de nuestra
          entidad.
        </p>
      </section>

      <section>
        <h2>6. Donaciones recurrentes</h2>
        <p>
          Salvo que el sitio indique expresamente un programa de aportes
          recurrentes, cada donación es <strong>única</strong>. No almacenamos
          datos bancarios para cargos automáticos en nuestro formulario.
        </p>
      </section>

      <section>
        <h2>7. Certificados tributarios y beneficios al donante</h2>
        <p>
          Que un proyecto reciba donaciones por web <strong>no implica</strong>{' '}
          automáticamente que el donante obtenga beneficio tributario (certificado
          Ley de donaciones con fines sociales u otros). Eso depende de que la
          entidad cumpla requisitos legales e inscripciones ante el SII. Consulta
          en el sitio o con {L.contactEmail} si tu donación califica para
          certificación.
        </p>
      </section>

      <section>
        <h2>8. Uso lícito y conducta</h2>
        <p>
          No debes usar el formulario para pruebas fraudulentas, ataques
          automatizados ni envío de contenido ilícito en mensajes. Podemos
          bloquear solicitudes abusivas y cooperar con autoridades cuando la ley
          lo exija.
        </p>
      </section>

      <section>
        <h2>9. Propiedad intelectual y contenidos</h2>
        <p>
          Textos, imágenes y diseño del sitio (salvo recursos de terceros con
          licencia propia) pertenecen al Responsable o a sus licenciantes. No
          copies el sitio para suplantar nuestra identidad.
        </p>
      </section>

      <section>
        <h2>10. Limitación de responsabilidad</h2>
        <p>
          En la medida permitida por la ley chilena, no respondemos por daños
          indirectos derivados de interrupciones del servicio, actuación de
          terceros (Khipu, bancos, internet) o uso indebido del sitio. Nuestra
          responsabilidad frente a una donación se limita a la correcta
          destinación de los fondos según la misión declarada y la rendición de
          cuentas que publicamos.
        </p>
      </section>

      <section>
        <h2>11. Privacidad</h2>
        <p>
          El tratamiento de datos personales se rige por nuestra{' '}
          <a href={L.paths.privacy}>Política de privacidad</a> y, si aplica, la{' '}
          <a href={L.paths.cookies}>Política de cookies</a>.
        </p>
      </section>

      <section>
        <h2>12. Ley aplicable y jurisdicción</h2>
        <p>
          Estos términos se interpretan según las leyes de la República de Chile.
          Cualquier controversia se someterá a los tribunales ordinarios de
          justicia con competencia en Chile, sin perjuicio de derechos imperativos
          del consumidor cuando correspondan.
        </p>
      </section>

      <section>
        <h2>13. Contacto</h2>
        <p>
          {L.legalName} — {L.contactEmail} — {L.address}.
        </p>
      </section>

      <p className="legal-disclaimer">
        Plantilla de términos para despliegues basados en PatasFelices. Revisa con
        abogado según tu tipo de entidad (persona natural, SpA, fundación, etc.).
      </p>
    </LegalPage>
  )
}
