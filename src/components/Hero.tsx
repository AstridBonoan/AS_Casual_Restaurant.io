import { DELIVERY_ESTIMATE, PICKUP_ESTIMATE } from '../data/menu'
import { useOrder } from '../context/useOrder'

export function Hero() {
  const { fulfillment } = useOrder()
  const eta = fulfillment === 'pickup' ? PICKUP_ESTIMATE : DELIVERY_ESTIMATE

  return (
    <section
      id="top"
      className="relative isolate overflow-x-clip bg-gradient-to-br from-brand-600 via-brand-500 to-amber-500 px-4 pb-8 pt-6 text-white sm:px-6"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
      <div className="relative mx-auto max-w-lg sm:max-w-2xl lg:max-w-4xl">
        <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
          Open now · Order in under 60 sec
        </p>
        <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
          Bowls & wraps,
          <br />
          ready when you are.
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">
          Build your order, pick pickup or delivery, and checkout — optimized
          for mobile so you eat sooner.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href="#menu"
            className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-700 shadow-lg transition active:scale-[0.98]"
          >
            Order now
          </a>
          <span className="rounded-xl bg-black/20 px-3 py-2 text-xs font-medium backdrop-blur">
            Est. {eta}
          </span>
        </div>
      </div>
    </section>
  )
}
