import type { MenuItem } from '../types'
import { useOrder } from '../context/OrderContext'
import { formatPrice } from '../utils/format'

interface Props {
  item: MenuItem
}

export function MenuItemCard({ item }: Props) {
  const { addItem, cart } = useOrder()
  const inCart = cart.find((line) => line.item.id === item.id)?.quantity ?? 0

  return (
    <article className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-stone-100">
      <div
        className={`h-20 w-20 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.imageGradient} shadow-inner`}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="font-display text-sm font-bold text-ink">{item.name}</h3>
          {item.popular && (
            <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand-700">
              Popular
            </span>
          )}
          {item.spicy && (
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">
              Spicy
            </span>
          )}
          {item.vegan && (
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
              Vegan
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-muted">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-bold text-ink">{formatPrice(item.price)}</span>
          <button
            type="button"
            onClick={() => addItem(item)}
            className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95"
          >
            {inCart > 0 ? `Added (${inCart})` : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}
