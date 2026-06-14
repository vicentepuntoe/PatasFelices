import type {
  KhipuPaymentResponse,
  KhipuPaymentStatusResponse,
} from '../types/donation'

export type CreateDonationPaymentInput = {
  amount: number
  donorName?: string
  message?: string
}

export async function createKhipuPayment(
  input: CreateDonationPaymentInput,
): Promise<KhipuPaymentResponse> {
  const response = await fetch('/api/khipu/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: input.amount,
      donorName: input.donorName,
      message: input.message,
      subject: 'Donación PatasFelices',
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error ?? 'No se pudo iniciar el pago.')
  }

  return data as KhipuPaymentResponse
}

export function readPaymentIdFromReturnUrl(): string | null {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('payment_id') ?? params.get('paymentId')
  const trimmed = id?.trim()
  return trimmed ? trimmed : null
}

export async function getKhipuPaymentStatus(
  paymentId: string,
): Promise<KhipuPaymentStatusResponse> {
  const response = await fetch(
    `/api/khipu/payments/${encodeURIComponent(paymentId)}`,
  )
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error ?? 'No pudimos consultar el estado del pago.')
  }

  return data as KhipuPaymentStatusResponse
}

export function isKhipuPaymentConfirmed(status: string): boolean {
  const normalized = status.trim().toLowerCase()
  return normalized === 'done' || normalized === 'paid' || normalized === 'completed'
}

export function isKhipuPaymentFailed(status: string): boolean {
  const normalized = status.trim().toLowerCase()
  return (
    normalized === 'rejected' ||
    normalized === 'aborted' ||
    normalized === 'expired' ||
    normalized === 'cancelled' ||
    normalized === 'canceled'
  )
}
