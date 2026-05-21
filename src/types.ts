export type Fulfillment = 'pickup' | 'delivery'

export type MenuCategory = 'bowls' | 'wraps' | 'sides' | 'drinks'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory
  popular?: boolean
  spicy?: boolean
  vegan?: boolean
  imageGradient: string
}

export interface CartLine {
  item: MenuItem
  quantity: number
}

export interface Promotion {
  id: string
  code: string
  title: string
  description: string
  discountPercent: number
  minSubtotal?: number
  badge?: string
}
