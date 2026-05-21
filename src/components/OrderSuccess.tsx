import { DELIVERY_ESTIMATE, PICKUP_ESTIMATE } from '../data/menu'
import { useOrder } from '../context/OrderContext'
import { formatPrice } from '../utils/format'

export function OrderSuccess() {
  const { orderPlaced, fulfillment, total, resetOrder, itemCount } = useOrder()

  if (!orderPlaced) return null

  const eta = fulfillment === 'pickup' ? PICKUP_ESTIMATE : DELIVERY_ESTIMATE

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          ✓
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-ink">
          Order placed!
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          {fulfillment === 'pickup'
            ? 'Head to the pickup window when you get the ready text.'
            : 'Your driver is on the way.'}
        </p>
        <p className="mt-4 rounded-xl bg-stone-50 py-3 text-sm">
          <span className="block text-xs uppercase text-ink-muted">Estimated ready</span>
          <span className="font-display text-lg font-bold text-brand-600">{eta}</span>
        </p>
        <p className="mt-2 text-sm">
          {itemCount} items · {formatPrice(total)}
        </p>
        <button
          type="button"
          onClick={resetOrder}
          className="mt-6 w-full rounded-xl bg-ink py-3 text-sm font-bold text-white"
        >
          Order again
        </button>
      </div>
    </div>
  )
}
