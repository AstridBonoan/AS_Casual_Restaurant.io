import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DELIVERY_FEE, PROMOTIONS } from '../data/menu'
import type { CartLine, Fulfillment, MenuItem } from '../types'
import { OrderContext, type OrderContextValue } from './order-context'

export function OrderProvider({ children }: { children: ReactNode }) {
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')
  const [cart, setCart] = useState<CartLine[]>([])
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromoId, setAppliedPromoId] = useState<string | null>(null)
  const [showCart, setShowCart] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const appliedPromo = useMemo(
    () => PROMOTIONS.find((p) => p.id === appliedPromoId) ?? null,
    [appliedPromoId],
  )

  const addItem = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
    setShowCart(true)
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((line) => line.item.id !== itemId))
      return
    }
    setCart((prev) =>
      prev.map((line) =>
        line.item.id === itemId ? { ...line, quantity } : line,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase()
    const match = PROMOTIONS.find((p) => p.code === normalized)
    if (!match) return false
    setAppliedPromoId(match.id)
    setPromoCode(match.code)
    return true
  }, [])

  const itemCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart],
  )

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
    [cart],
  )

  const discount = useMemo(() => {
    if (!appliedPromo || subtotal === 0) return 0
    if (appliedPromo.minSubtotal && subtotal < appliedPromo.minSubtotal) return 0
    if (appliedPromo.id === 'pickup10' && fulfillment !== 'pickup') return 0
    return (subtotal * appliedPromo.discountPercent) / 100
  }, [appliedPromo, subtotal, fulfillment])

  const fees = fulfillment === 'delivery' && subtotal > 0 ? DELIVERY_FEE : 0

  const total = Math.max(0, subtotal - discount + fees)

  const placeOrder = useCallback(() => {
    if (cart.length === 0) return
    setOrderPlaced(true)
    setShowCart(false)
  }, [cart.length])

  const resetOrder = useCallback(() => {
    setOrderPlaced(false)
    clearCart()
    setAppliedPromoId(null)
    setPromoCode('')
  }, [clearCart])

  const value: OrderContextValue = {
    fulfillment,
    setFulfillment,
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromo,
    itemCount,
    subtotal,
    discount,
    fees,
    total,
    showCart,
    setShowCart,
    orderPlaced,
    placeOrder,
    resetOrder,
  }

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  )
}
