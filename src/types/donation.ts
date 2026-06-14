export type DonationPreset = {
  amount: number
  label: string
  impact: string
}

export type TransparencyEntry = {
  id: string
  date: string
  donorLabel: string
  amount: number
  allocation: string
  receiptNote: string
}

export type KhipuPaymentResponse = {
  paymentId: string
  paymentUrl: string
  simplifiedTransferUrl?: string
}

export type KhipuPaymentStatusResponse = {
  paymentId: string
  status: string
  amount?: number
  currency?: string
}

export type LiveDonationEntry = {
  id: string
  khipuPaymentId: string
  amount: number
  currency: string
  donorLabel: string
  message?: string
  khipuStatus: string
  createdAt: string
}
