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
