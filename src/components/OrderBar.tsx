import { useOrder } from '../context/OrderContext'
import { formatPrice } from '../utils/format'

export function OrderBar() {
  const { itemCount, total, setShowCart, orderPlaced } = useOrder()

  if (itemCount === 0 || orderPlaced) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-lg items-center gap-3 sm:max-w-2xl lg:max-w-4xl">
        <button
          type="button"
          onClick={() => setShowCart(true)}
          className="flex flex-1 items-center justify-between rounded-xl bg-brand-600 px-4 py-3.5 text-white shadow-lg transition active:scale-[0.98]"
        >
          <span className="text-sm font-bold">
            View cart · {itemCount} item{itemCount !== 1 ? 's' : ''}
          </span>
          <span className="text-sm font-bold">{formatPrice(total)}</span>
        </button>
      </div>
    </div>
  )
}
