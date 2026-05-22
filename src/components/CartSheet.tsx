import { useState, type ReactNode } from 'react'
import { useOrder } from '../context/useOrder'
import { formatPrice } from '../utils/format'

export function CartSheet() {
  const {
    showCart,
    setShowCart,
    cart,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    fees,
    total,
    promoCode,
    setPromoCode,
    applyPromo,
    appliedPromo,
    fulfillment,
    placeOrder,
    itemCount,
  } = useOrder()

  const [promoError, setPromoError] = useState('')

  if (!showCart) return null

  const handleApplyPromo = () => {
    const ok = applyPromo(promoCode)
    setPromoError(ok ? '' : 'Invalid promo code')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close cart"
        onClick={() => setShowCart(false)}
      />
      <div className="relative max-h-[88dvh] overflow-hidden rounded-t-3xl bg-white shadow-2xl">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-stone-200" />
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-4">
          <h2 className="font-display text-lg font-bold">Your order</h2>
          <button
            type="button"
            onClick={() => setShowCart(false)}
            className="rounded-full p-2 text-ink-muted hover:bg-stone-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: 'calc(88dvh - 200px)' }}>
          {cart.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-muted">
              Your cart is empty. Add something from the menu!
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.map((line) => (
                <li key={line.item.id} className="flex gap-3">
                  <div
                    className={`h-14 w-14 flex-shrink-0 rounded-lg bg-gradient-to-br ${line.item.imageGradient}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{line.item.name}</p>
                    <p className="text-xs text-ink-muted">
                      {formatPrice(line.item.price)} each
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <QuantityButton
                        label="Decrease"
                        onClick={() =>
                          updateQuantity(line.item.id, line.quantity - 1)
                        }
                      >
                        −
                      </QuantityButton>
                      <span className="w-6 text-center text-sm font-bold">
                        {line.quantity}
                      </span>
                      <QuantityButton
                        label="Increase"
                        onClick={() =>
                          updateQuantity(line.item.id, line.quantity + 1)
                        }
                      >
                        +
                      </QuantityButton>
                      <button
                        type="button"
                        onClick={() => removeItem(line.item.id)}
                        className="ml-auto text-xs font-medium text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold">
                    {formatPrice(line.item.price * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 rounded-xl bg-stone-50 p-3">
            <label className="text-xs font-semibold uppercase text-ink-muted">
              Promo code
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase())
                  setPromoError('')
                }}
                placeholder="e.g. WELCOME15"
                className="min-w-0 flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm uppercase outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="rounded-lg bg-stone-800 px-3 py-2 text-xs font-bold text-white"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="mt-1 text-xs text-red-600">{promoError}</p>
            )}
            {appliedPromo && !promoError && (
              <p className="mt-1 text-xs text-emerald-600">
                {appliedPromo.title} (−{appliedPromo.discountPercent}%)
              </p>
            )}
          </div>

          {cart.length > 0 && (
            <dl className="mt-4 space-y-1 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              {discount > 0 && (
                <Row label="Promo" value={`−${formatPrice(discount)}`} accent />
              )}
              {fees > 0 && <Row label="Delivery fee" value={formatPrice(fees)} />}
              <Row
                label={`Total · ${fulfillment}`}
                value={formatPrice(total)}
                bold
              />
            </dl>
          )}
        </div>

        <div className="border-t border-stone-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={placeOrder}
            className="w-full rounded-xl bg-brand-600 py-4 text-sm font-bold text-white shadow-lg transition enabled:active:scale-[0.98] disabled:opacity-40"
          >
            {cart.length === 0
              ? 'Add items to checkout'
              : `Place ${fulfillment} order · ${formatPrice(total)}`}
          </button>
          {itemCount > 0 && (
            <p className="mt-2 text-center text-xs text-ink-muted">
              {itemCount} item{itemCount !== 1 ? 's' : ''} · Pay at {fulfillment === 'pickup' ? 'counter' : 'door'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function QuantityButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-lg font-medium"
    >
      {children}
    </button>
  )
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string
  value: string
  bold?: boolean
  accent?: boolean
}) {
  return (
    <div className={`flex justify-between ${bold ? 'border-t border-stone-100 pt-2 text-base font-bold' : ''}`}>
      <dt className={accent ? 'text-emerald-600' : 'text-ink-muted'}>{label}</dt>
      <dd className={accent ? 'text-emerald-600' : ''}>{value}</dd>
    </div>
  )
}
