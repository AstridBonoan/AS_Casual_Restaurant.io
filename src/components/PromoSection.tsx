import { PROMOTIONS } from '../data/menu'
import { useOrder } from '../context/useOrder'

export function PromoSection() {
  const { applyPromo, appliedPromo } = useOrder()

  return (
    <section id="promos" className="mx-auto max-w-lg px-4 sm:max-w-2xl lg:max-w-4xl">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Deals & promos</h2>
        {appliedPromo && (
          <span className="text-xs font-semibold text-brand-600">
            {appliedPromo.code} applied
          </span>
        )}
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROMOTIONS.map((promo) => (
          <article
            key={promo.id}
            className="min-w-[260px] flex-shrink-0 snap-start rounded-2xl bg-gradient-to-br from-stone-900 to-stone-700 p-4 text-white shadow-md"
          >
            {promo.badge && (
              <span className="mb-2 inline-block rounded-md bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {promo.badge}
              </span>
            )}
            <h3 className="font-display text-base font-bold">{promo.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-300">
              {promo.description}
            </p>
            <button
              type="button"
              onClick={() => applyPromo(promo.code)}
              className="mt-3 w-full rounded-lg bg-white/10 py-2 text-xs font-bold uppercase tracking-wide ring-1 ring-white/20 transition hover:bg-white/20 active:scale-[0.98]"
            >
              Use {promo.code}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
