import type { DonationPreset, TransparencyEntry } from '../types/donation'

export const donationPresets: DonationPreset[] = [
  {
    amount: 5000,
    label: '$5.000',
    impact: 'Alimenta a un cachorro rescatado por una semana.',
  },
  {
    amount: 15000,
    label: '$15.000',
    impact: 'Cubre vacunas básicas y desparasitación.',
  },
  {
    amount: 35000,
    label: '$35.000',
    impact: 'Financia una consulta veterinaria de urgencia.',
  },
  {
    amount: 75000,
    label: '$75.000',
    impact: 'Apoya esterilización y recuperación postoperatoria.',
  },
]

/** Ejemplo de transparencia: en producción vendría de tu base de datos o panel admin. */
export const transparencyLedger: TransparencyEntry[] = [
  {
    id: 'tx-001',
    date: '2026-06-10',
    donorLabel: 'María G.',
    amount: 15000,
    allocation: 'Vacunas — Luna (perra mestiza)',
    receiptNote: 'Boleta veterinaria #4821 publicada',
  },
  {
    id: 'tx-002',
    date: '2026-06-08',
    donorLabel: 'Donación anónima',
    amount: 35000,
    allocation: 'Cirugía menor — Tomás (gato)',
    receiptNote: 'Comprobante clínica San Patitas',
  },
  {
    id: 'tx-003',
    date: '2026-06-05',
    donorLabel: 'Familia Rojas',
    amount: 5000,
    allocation: 'Alimento — refugio semanal',
    receiptNote: 'Factura supermercado mascotas',
  },
]

export const animalGallery = [
  {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    alt: 'Perro mestizo con mirada dulce esperando adopción',
    caption: 'Cada donación es un plato lleno y una noche segura.',
  },
  {
    src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    alt: 'Gato naranja acurrucado',
    caption: 'Rescatamos, curamos y buscamos hogar con amor.',
  },
  {
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    alt: 'Dos perros jugando en el pasto',
    caption: 'Tu apoyo financia rehabilitación y paseos de socialización.',
  },
  {
    src: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
    alt: 'Gato atigrado mirando a cámara',
    caption: 'Publicamos cada peso: de la donación al comprobante.',
  },
]

/** Textos e imágenes de la página de gracias tras donar (por estado del pago). */
export const thankYouMoments = {
  loading: {
    src: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=900&q=85',
    alt: 'Cachorro golden mirando con curiosidad',
    eyebrow: 'Un momentito…',
    title: 'Estamos confirmando tu aporte',
    body: [
      'Gracias por quedarte aquí. Khipu suele tardar unos segundos en avisarnos que todo salió bien.',
      'Mientras tanto, en el refugio hay colitas moviéndose sin saber que alguien bueno acaba de ayudar.',
    ],
  },
  pending: {
    src: 'https://images.unsplash.com/photo-1583511655857-8499f1740b8?w=900&q=85',
    alt: 'Perrito bulldog esperando con paciencia',
    eyebrow: 'Gracias de corazón',
    title: 'Tu donación va en camino',
    body: [
      'Ya volviste de Khipu y eso para nosotros ya significa muchísimo. A veces el banco tarda un poco más en dar el “listo”.',
      'Si ya transferiste, respira tranquilo: lo registraremos en cuanto llegue la confirmación y lo verás en transparencia, con comprobante.',
    ],
  },
  confirmed: {
    src: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=85',
    alt: 'Cachorro feliz mirando a la cámara',
    secondarySrc:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    secondaryAlt: 'Dos perritos jugando en el pasto',
    eyebrow: 'Gracias, gracias, gracias',
    title: 'Lo recibimos. De verdad te lo agradecemos.',
    body: [
      'No sabemos si pusiste tu nombre o preferiste el anonimato, pero acá estamos con los ojos brillosos: tu donación ya está confirmada.',
      'Ese dinero se convierte en comida, vacunas, veterinario y noches secas para perros y gatos que no tuvieron suerte al principio. Te contaremos en qué se usó, peso a peso.',
    ],
    signOff: 'Con cariño, el equipo PatasFelices (y los rescatados que no saben escribir, pero menean la cola por ti).',
  },
  failed: {
    src: 'https://images.unsplash.com/photo-1477884213360-558e8548f932?w=900&q=85',
    alt: 'Perro mestizo con mirada tierna',
    eyebrow: 'Oye, no pasa nada',
    title: 'Esta vez el pago no se completó',
    body: [
      'Intentaste ayudarnos y eso ya nos importa. Khipu marcó el cobro como cancelado o rechazado, así que no se hizo ningún cargo exitoso.',
      'Cuando puedas, vuelve a intentarlo. Ellos siguen aquí, esperando una oportunidad — y nosotros seguimos agradecidos por estar.',
    ],
  },
  missingId: {
    src: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=85',
    alt: 'Persona abrazando a un perro rescatado',
    eyebrow: 'Gracias por estar',
    title: 'Si donaste hoy: mil gracias',
    body: [
      'A veces la página vuelve sin el código del pago, pero eso no quita tu gesto.',
      'Revisa tu correo o movimientos del banco. En cuanto tengamos la confirmación, lo sumamos al libro de transparencia.',
    ],
  },
  error: {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=85',
    alt: 'Perro mestizo con mirada dulce',
    eyebrow: 'Gracias igual',
    title: 'No pudimos verificar el pago ahora mismo',
    body: [
      'Nuestro sistema falló un momento, no tú. Si el cargo ya aparece en tu banco, guarda el comprobante.',
      'Escríbenos si necesitas ayuda; mientras tanto, desde acá te decimos gracias por pensar en ellos.',
    ],
  },
} as const
