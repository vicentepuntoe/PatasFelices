# PatasFelices

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**PatasFelices** es un proyecto **open source** para crear sitios web de **donaciones a animales** en Chile. La app muestra el impacto de cada aporte, explica cómo se usan los fondos con **transparencia**, y permite pagar con **Khipu** sin obligar a los donantes a registrarse en tu sitio.

> **English (short):** Open-source React + TypeScript donation landing page for animal rescues in Chile, with a transparency ledger UI and a small Node API for Khipu payment creation. Legal compliance is your responsibility—see the checklist below.

---

## ¿Por qué open source?

Queremos que refugios, fundaciones y colectivos puedan **fork**, adaptar y desplegar su propia página sin depender de plataformas cerradas caras. Tú controlas el diseño, los textos, el libro de transparencia y la integración con tu cuenta de cobro.

**Importante:** este repositorio es **software**, no una organización benéfica registrada. Quien despliegue el sitio debe cumplir la normativa chilena y los requisitos de su pasarela de pago.

---

## Características

- Landing emocional orientada a conversión (hero, misión, galería).
- Sección de **transparencia** (flujo donación → gasto → comprobante).
- Formulario de donación con montos sugeridos y monto libre (CLP).
- Integración **Khipu** vía API en servidor (las claves secretas no van al navegador).
- Sin autenticación de usuarios (solo pago en Khipu).
- Stack: **React 19**, **TypeScript**, **Vite**, **Express** (API mínima).

---

## Requisitos técnicos

- Node.js 20+ (recomendado)
- Cuenta **Khipu** con credenciales de cobrador ([documentación para comercios](https://khipu.com))
- Dominio con **HTTPS** en producción
- (Recomendado) **Cloudflare** delante del sitio: DNS, TLS, WAF y **Turnstile** anti-bots

---

## Inicio rápido

```bash
git clone https://github.com/vicentepuntoe/PatasFelices.git
cd PatasFelices
npm install
cp .env.example .env
# Edita .env con KHIPU_RECEIVER_ID, KHIPU_SECRET y APP_URL
npm run dev
```

| Servicio | URL (desarrollo) |
|----------|------------------|
| Frontend | http://localhost:5173 |
| API Khipu | http://localhost:3001 |

Scripts útiles:

- `npm run dev` — frontend + API
- `npm run build` — build de producción del frontend
- `npm run preview` — vista previa del build

### Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `KHIPU_RECEIVER_ID` | ID de cobrador Khipu |
| `KHIPU_SECRET` | Secreto de la API (solo servidor) |
| `APP_URL` | URL pública del sitio (retorno/cancelación de pago) |
| `KHIPU_NOTIFY_URL` | (Opcional) Webhook de confirmación de pago |
| `KHIPU_API_PORT` | Puerto de la API en local (default `3001`) |

---

## Arquitectura

```
src/           → UI React (donaciones, transparencia, contenido)
server/        → API Express: POST /api/khipu/payments
vite.config.ts → Proxy /api → API en desarrollo
```

En producción debes exponer la API en el mismo origen (reverse proxy) o configurar CORS y la URL del frontend de forma explícita.

---

## Poner un sitio de donaciones en Chile: guía práctica

**Aviso legal:** esto es orientación general para equipos técnicos y de producto. **No sustituye** asesoría de abogado, contador o el SII. Las reglas cambian y dependen de tu caso (persona natural, EIRL, SpA, fundación, etc.).

### ¿Hay que crear una “empresa formal”?

| Situación | Qué suele implicar |
|-----------|-------------------|
| **Colectivo pequeño / prueba** | Muchos arrancan con **persona natural** con RUT y cuenta bancaria, usando Khipu u otra pasarela. Limitaciones en imagen, responsabilidad personal y tratamiento tributario. |
| **Refugio o proyecto estable** | Suele convenir una **persona jurídica** (p. ej. **SpA**, **EIRL**) o una **fundación / corporación sin fines de lucro** con personalidad jurídica, para separar patrimonio, firmar contratos y abrir cuenta bancaria a nombre de la organización. |
| **Donaciones con **beneficio tributario** para el donante** | No basta con tener web: la entidad debe calificar y estar **inscrita** en los regímenes que contempla la **ley de donaciones con fines sociales** (marco actual derivado de la **Ley N° 19.885** y normativa del **Ministerio de Hacienda / SII**). Requiere cumplir requisitos estrictos de objeto social, rendición y elegibilidad. |

**Conclusión:** no siempre es obligatorio constituir una SpA el día uno, pero para operar en serio, recibir montos relevantes y dar confianza (y opcionalmente certificar donaciones), casi siempre se avanza hacia **personalidad jurídica** + **cuenta bancaria institucional** + **contabilidad clara**.

### Pasarela de pagos (Khipu)

- Khipu exige **verificación de identidad** (RUT) y **cuenta bancaria** asociada al cobrador.
- Lee los **términos del servicio** y las comisiones vigentes.
- Configura `return_url`, `cancel_url` y, en producción, **`notify_url`** para registrar pagos en tu backend o base de datos.
- No almacenes datos bancarios de donantes; Khipu procesa el pago en su entorno.

### Privacidad y datos personales (Chile)

Si recoges **nombre**, **email**, **mensaje** o **IP/logs**, aplicas la **Ley N° 19.628** sobre protección de datos personales y, desde 2024, obligaciones reforzadas de la **Ley N° 21.459** (tratamiento seguro, minimización, derechos de acceso/cancelación, etc.).

En el sitio deberías publicar, como mínimo:

1. **Política de privacidad** — qué datos recoges, para qué, cuánto tiempo, con quién los compartes (Khipu, hosting, analytics), y cómo ejercer derechos ARCO.
2. **Política de cookies / tecnologías similares** — si usas analytics, pixels o Turnstile.
3. **Base legal clara** — el donante acepta el tratamiento necesario para procesar la donación y la transparencia acordada (nombre opcional en el libro público).

El repositorio incluye plantillas en rutas `/privacidad`, `/terminos` y `/cookies`. **Complétalas** editando `src/data/siteLegal.ts` (RUT, razón social, hosting, flags de Turnstile/analytics). Plantillas genéricas no bastan: ajústalas a lo que **realmente** hace tu despliegue y revísalas con abogado.

### Transparencia y confianza (más allá del código)

- **Términos de donación**: la donación es voluntaria; si aceptas donaciones recurrentes en el futuro, indícalo; política de reembolsos (en general las donaciones **no** son reembolsables salvo error de cobro).
- **Identificación de la organización**: nombre, RUT de la entidad, domicilio o región, email de contacto.
- **Libro de transparencia**: este repo incluye una **UI de ejemplo**; en producción los datos deben salir de tu **base de datos** o panel admin alimentado con comprobantes reales.
- **No engañar**: fotos y casos reales; cumplir la **Ley N° 21.080** (publicidad) si haces campañas pagadas.

### Seguridad web (Cloudflare y anti-bots)

Para un formulario de donación público conviene:

| Medida | Por qué |
|--------|--------|
| **HTTPS** | Obligatorio para confianza y pasarelas. |
| **Cloudflare Turnstile** | Alternativa a reCAPTCHA; reduce bots en el POST de creación de pago. [Docs Turnstile](https://developers.cloudflare.com/turnstile/) |
| **Rate limiting** | En `/api/khipu/payments` (Cloudflare WAF, nginx o middleware Express). |
| **Headers de seguridad** | CSP, HSTS, etc. |
| **Secrets** | `KHIPU_SECRET` solo en servidor; nunca en el repo ni en variables `VITE_*`. |

Turnstile no sustituye una política de privacidad: revisa el [addendum de privacidad de Turnstile](https://developers.cloudflare.com/turnstile/) al redactar cookies y terceros.

### Tributación (muy resumido)

- Los ingresos por donaciones pueden tener tratamiento distinto según **quién recibe** (persona natural vs entidad sin fines de lucro inscrita vs empresa).
- Consulta con **contador** cómo declarar ingresos, emitir documentos si corresponde, y si tu proyecto puede acceder al **regimen de donaciones** con certificado al donante.
- Fuente oficial: [SII – Donaciones](https://www.sii.cl) y normativa de donaciones con fines sociales en [bcn.cl](https://www.bcn.cl).

### Checklist antes de producción

- [ ] Definir entidad responsable (natural / jurídica / fundación) y RUT
- [ ] Cuenta bancaria y Khipu verificados a nombre coherente con el sitio
- [ ] Política de privacidad + términos de donación publicados
- [ ] Página “Quiénes somos” y contacto verificable
- [ ] HTTPS + dominio propio
- [ ] Turnstile (u otro control anti-abuso) en el flujo de donación
- [ ] Webhook Khipu y registro persistente de pagos
- [ ] Proceso interno para publicar comprobantes en transparencia
- [ ] Revisión legal/tributaria según tu escala

---

## Roadmap sugerido (contribuciones bienvenidas)

- [ ] Integración **Cloudflare Turnstile** en frontend + verificación en API
- [x] Páginas legales (`/privacidad`, `/terminos`, `/cookies`) — completar `siteLegal.ts`
- [ ] Webhook Khipu → base de datos + panel de transparencia
- [ ] Tests e2e del flujo de donación (mock Khipu)
- [ ] i18n (es/en)

---

## Contribuir

1. Fork del repositorio
2. Rama feature (`git checkout -b feature/mi-mejora`)
3. Commit claro
4. Pull request con descripción y capturas si hay cambios de UI

Por favor no subas credenciales ni `.env` reales.

---

## Licencia

Este proyecto se distribuye bajo la licencia **MIT** (ver archivo `LICENSE` si está presente en el repo). Úsalo, modifícalo y despliégalo libremente; la responsabilidad legal del sitio en producción es de quien lo opera.

---

## Créditos

Desarrollado para la comunidad de rescate animal. Imágenes de ejemplo vía [Unsplash](https://unsplash.com) en la demo; reemplázalas por fotos propias o con licencia en tu despliegue.

**¿Preguntas legales o tributarias?** Consulta profesionales en Chile. **¿Preguntas técnicas?** Abre un [issue](https://github.com/vicentepuntoe/PatasFelices/issues).
