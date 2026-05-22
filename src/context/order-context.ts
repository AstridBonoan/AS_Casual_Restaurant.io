import { createContext } from 'react'
import { PROMOTIONS } from '../data/menu'
import type { CartLine, Fulfillment, MenuItem } from '../types'

export interface OrderContextValue {
  fulfillment: Fulfillment
  setFulfillment: (mode: Fulfillment) => void
  cart: CartLine[]
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  promoCode: string
  setPromoCode: (code: string) => void
  appliedPromo: (typeof PROMOTIONS)[number] | null
  applyPromo: (code: string) => boolean
  itemCount: number
  subtotal: number
  discount: number
  fees: number
  total: number
  showCart: boolean
  setShowCart: (open: boolean) => void
  orderPlaced: boolean
  placeOrder: () => void
  resetOrder: () => void
}

export const OrderContext = createContext<OrderContextValue | null>(null)
