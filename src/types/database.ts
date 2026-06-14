export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_label: string
          id: string
          khipu_payment_id: string
          khipu_status: string
          message: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_label?: string
          id?: string
          khipu_payment_id: string
          khipu_status: string
          message?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_label?: string
          id?: string
          khipu_payment_id?: string
          khipu_status?: string
          message?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type DonationRow = Database['public']['Tables']['donations']['Row']
