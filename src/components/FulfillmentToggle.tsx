import { DELIVERY_ESTIMATE, PICKUP_ESTIMATE } from '../data/menu'
import { useOrder } from '../context/OrderContext'
import type { Fulfillment } from '../types'

const options: { id: Fulfillment; label: string; sub: string; icon: string }[] = [
  { id: 'pickup', label: 'Pickup', sub: PICKUP_ESTIMATE, icon: '🏃' },
  { id: 'delivery', label: 'Delivery', sub: DELIVERY_ESTIMATE, icon: '🛵' },
]

export function FulfillmentToggle() {
  const { fulfillment, setFulfillment } = useOrder()

  return (
    <section
      className="relative z-10 mx-auto max-w-lg px-4 sm:max-w-2xl lg:max-w-4xl"
      aria-label="Fulfillment method"
    >
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-stone-200">
        {options.map((opt) => {
          const active = fulfillment === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFulfillment(opt.id)}
              className={`rounded-xl px-3 py-3 text-left transition ${
                active
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-ink-muted hover:bg-stone-50'
              }`}
            >
              <span className="text-lg" aria-hidden>
                {opt.icon}
              </span>
              <p className="font-display text-sm font-bold">{opt.label}</p>
              <p className={`text-xs ${active ? 'text-white/80' : 'text-stone-400'}`}>
                {opt.sub}
              </p>
            </button>
          )
        })}
      </div>
      {fulfillment === 'delivery' && (
        <p className="mt-2 text-center text-xs text-ink-muted">
          Delivery within 3 mi · $3.49 fee applies
        </p>
      )}
    </section>
  )
}
