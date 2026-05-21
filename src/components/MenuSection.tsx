import { useMemo, useState } from 'react'
import { CATEGORY_LABELS, MENU_ITEMS } from '../data/menu'
import type { MenuCategory } from '../types'
import { MenuItemCard } from './MenuItemCard'

const categories: MenuCategory[] = ['bowls', 'wraps', 'sides', 'drinks']

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory | 'all'>('all')

  const filtered = useMemo(() => {
    if (active === 'all') return MENU_ITEMS
    return MENU_ITEMS.filter((item) => item.category === active)
  }, [active])

  const grouped = useMemo(() => {
    if (active !== 'all') return [{ category: active, items: filtered }]
    return categories
      .map((cat) => ({
        category: cat,
        items: MENU_ITEMS.filter((i) => i.category === cat),
      }))
      .filter((g) => g.items.length > 0)
  }, [active, filtered])

  return (
    <section id="menu" className="mx-auto max-w-lg px-4 sm:max-w-2xl lg:max-w-4xl">
      <h2 className="font-display text-lg font-bold text-ink">Menu</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Tap to add — your cart updates instantly.
      </p>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <FilterChip
          label="All"
          active={active === 'all'}
          onClick={() => setActive('all')}
        />
        {categories.map((cat) => (
          <FilterChip
            key={cat}
            label={CATEGORY_LABELS[cat]}
            active={active === cat}
            onClick={() => setActive(cat)}
          />
        ))}
      </div>

      <div className="mt-4 space-y-6">
        {grouped.map(({ category, items }) => (
          <div key={category}>
            {active === 'all' && (
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {CATEGORY_LABELS[category]}
              </h3>
            )}
            <div className="space-y-3">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
        active
          ? 'bg-ink text-white'
          : 'bg-white text-ink-muted ring-1 ring-stone-200'
      }`}
    >
      {label}
    </button>
  )
}
