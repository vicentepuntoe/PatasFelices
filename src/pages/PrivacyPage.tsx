import { LegalPage } from '../components/LegalPage'
import { siteLegal } from '../data/siteLegal'

export function PrivacyPage() {
  const L = siteLegal
  return (
    <LegalPage title="Política de privacidad">
      <p className="legal-lead">
        Esta política describe cómo <strong>{L.legalName}</strong> (en adelante,
        el &quot;Responsable&quot;) trata los datos personales cuando usas el sitio web{' '}
        <strong>{L.brandName}</strong> para realizar donaciones voluntarias en Chile.
      </p>

      <section>
        <h2>1. Responsable del tratamiento</h2>
        <ul>
          <li>
            <strong>Titular:</strong> {L.legalName}
          </li>
          <li>
            <strong>RUT:</strong> {L.rut}
          </li>
          <li>
            <strong>Domicilio:</strong> {L.address}
          </li>
          <li>
            <strong>Contacto general:</strong>{' '}
            <a href={`mailto:${L.contactEmail}`}>{L.contactEmail}</a>
          </li>
          <li>
            <strong>Privacidad y derechos ARCO:</strong>{' '}
            <a href={`mailto:${L.privacyEmail}`}>{L.privacyEmail}</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Marco normativo</h2>
        <p>
          El tratamiento se realiza conforme a la legislación chilena aplicable,
          en particular la <strong>Ley N° 19.628</strong> sobre protección de la
          vida privada y sus modificaciones, las obligaciones de seguridad y buenas
          prácticas asociadas a la <strong>Ley N° 21.459</strong>, y demás normas
          que resulten aplicables. La normativa de datos personales en Chile puede
          actualizarse; publicaremos cambios relevantes en esta página.
        </p>
      </section>

      <section>
        <h2>3. Datos que recopilamos</h2>
        <p>Según el uso que hagas del sitio, podemos tratar:</p>
        <ul>
          <li>
            <strong>Datos de la donación:</strong> monto en pesos chilenos (CLP).
          </li>
          <li>
            <strong>Datos opcionales que tú entregas:</strong> nombre o
            pseudónimo para aparecer en el libro de transparencia, y mensaje
            opcional para el equipo.
          </li>
          <li>
            <strong>Datos técnicos:</strong> dirección IP, fecha y hora de la
            solicitud, tipo de navegador y registros del servidor o del proveedor
            de hosting ({L.hostingProvider}) necesarios para operar y proteger el
            sitio.
          </li>
          <li>
            <strong>Datos de pago:</strong> no almacenamos en nuestros servidores
            números de tarjeta, claves bancarias ni credenciales de pago. El cobro
            se procesa en el entorno de <strong>Khipu SpA</strong>, quien actúa
            como encargado o responsable según su propia política para los datos
            necesarios a la transacción (por ejemplo, identificación del pagador
            según el medio de pago elegido en Khipu).
          </li>
        </ul>
        <p>
          No exigimos crear una cuenta en nuestro sitio. No solicitamos correo
          electrónico en el formulario de donación actual; si en el futuro lo
          hiciéramos, actualizaríamos esta política.
        </p>
      </section>

      <section>
        <h2>4. Finalidades y base de tratamiento</h2>
        <ul>
          <li>
            <strong>Procesar tu donación:</strong> crear el cobro en Khipu y
            redirigirte a la pasarela (ejecución de la relación de donación /
            consentimiento cuando aportas datos opcionales).
          </li>
          <li>
            <strong>Transparencia:</strong> si indicas un nombre, podemos
            publicarlo de forma abreviada en el registro público de uso de fondos,
            salvo que elijas permanecer anónimo.
          </li>
          <li>
            <strong>Seguridad y prevención de fraude:</strong> logs, límites de
            uso y, si se implementan, controles anti-bots (por ejemplo Cloudflare
            Turnstile).
          </li>
          <li>
            <strong>Cumplimiento legal:</strong> conservación de registros cuando
            la ley o la contabilidad lo exijan.
          </li>
        </ul>
        <p>
          Solo tratamos datos necesarios para estas finalidades (principio de
          minimización).
        </p>
      </section>

      <section>
        <h2>5. Destinatarios y transferencias</h2>
        <p>Podemos comunicar datos a:</p>
        <ul>
          <li>
            <strong>Khipu SpA</strong> — procesamiento del pago. Consulta su
            política en{' '}
            <a
              href="https://khipu.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              khipu.com
            </a>
            .
          </li>
          <li>
            <strong>{L.hostingProvider}</strong> — alojamiento, CDN y medidas de
            seguridad del sitio. Si el proveedor opera fuera de Chile, la
            transferencia internacional se realizará con las salvaguardas que
            exija la normativa vigente.
          </li>
        </ul>
        <p>No vendemos ni arrendamos tus datos personales.</p>
      </section>

      <section>
        <h2>6. Plazos de conservación</h2>
        <ul>
          <li>
            Datos asociados a una donación confirmada: el tiempo necesario para
            transparencia, contabilidad y defensa de reclamos (en general, hasta
            varios años según obligaciones tributarias y contables; concretar con
            tu contador).
          </li>
          <li>
            Registros técnicos y de seguridad: plazo breve u orientado a
            incidentes, salvo obligación legal de conservación más larga.
          </li>
          <li>
            Datos en Khipu: según las políticas y obligaciones de Khipu.
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Tus derechos (acceso, rectificación, cancelación y oposición)</h2>
        <p>
          Puedes ejercer tus derechos respecto de los datos que tratamos
          directamente escribiendo a{' '}
          <a href={`mailto:${L.privacyEmail}`}>{L.privacyEmail}</a>, indicando tu
          identidad y el derecho que deseas ejercer. Responderemos en un plazo
          razonable, orientativamente dentro de {L.arcoResponseDays} días hábiles,
          salvo casos complejos o fuerza mayor.
        </p>
        <p>
          Para datos tratados exclusivamente por Khipu en el pago, deberás
          también dirigirte a Khipu según sus canales de atención.
        </p>
      </section>

      <section>
        <h2>8. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables: HTTPS en
          producción, secretos de API solo en servidor, sin almacenar datos
          bancarios de donantes, y acceso restringido a credenciales. Ningún
          sistema es 100 % seguro; si detectas un problema, avísanos de inmediato.
        </p>
      </section>

      <section>
        <h2>9. Menores de edad</h2>
        <p>
          Las donaciones en línea deben ser realizadas por personas con capacidad
          para contratar o con autorización de quien ejerce la patria potestad. No
          recopilamos datos de menores de forma deliberada.
        </p>
      </section>

      <section>
        <h2>10. Cambios</h2>
        <p>
          Podemos actualizar esta política. La fecha de &quot;última
          actualización&quot; al inicio del documento indica la versión vigente.
          El uso continuado del sitio tras cambios relevantes implica que has
          tomado conocimiento de la nueva versión.
        </p>
      </section>

      <p className="legal-disclaimer">
        Este texto es una plantilla alineada al funcionamiento técnico del
        proyecto open source PatasFelices. No sustituye asesoría legal
        personalizada para tu entidad.
      </p>
    </LegalPage>
  )
}
