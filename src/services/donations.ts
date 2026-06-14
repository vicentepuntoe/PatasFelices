import type { LiveDonationEntry } from '../types/donation'

export type LiveDonationsSnapshot = {
  live: boolean
  count: number
  totalAmount: number
  donations: LiveDonationEntry[]
}

export async function fetchLiveDonations(): Promise<LiveDonationsSnapshot> {
  const response = await fetch('/api/donations')
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    throw new Error(
      'La API de donaciones no respondió. Reinicia con npm run dev y abre http://localhost:5173.',
    )
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error ?? 'No pudimos cargar las donaciones.')
  }

  return data as LiveDonationsSnapshot
}

export async function registerDonationAfterPayment(
  paymentId: string,
): Promise<void> {
  const response = await fetch(
    `/api/khipu/payments/${encodeURIComponent(paymentId)}/register`,
    { method: 'POST' },
  )

  if (response.status === 409) return

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data?.error ?? 'No pudimos registrar la donación.')
  }
}
