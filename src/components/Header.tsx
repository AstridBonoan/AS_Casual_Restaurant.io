import { useOrder } from '../context/OrderContext'

export function Header() {
  const { itemCount, setShowCart } = useOrder()

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3 sm:max-w-2xl lg:max-w-4xl">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-sm">
            EB
          </span>
          <div className="text-left">
            <p className="font-display text-base font-bold leading-tight text-ink">
              Ember Bowl Co.
            </p>
            <p className="text-xs text-ink-muted">Fast · Fresh · Ready</p>
          </div>
        </a>
        <button
          type="button"
          onClick={() => setShowCart(true)}
          className="relative rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition active:scale-95"
          aria-label={`Open cart, ${itemCount} items`}
        >
          Cart
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
