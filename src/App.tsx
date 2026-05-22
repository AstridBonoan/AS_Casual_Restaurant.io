import { CartSheet } from './components/CartSheet'
import { Footer } from './components/Footer'
import { FulfillmentToggle } from './components/FulfillmentToggle'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuSection } from './components/MenuSection'
import { OrderBar } from './components/OrderBar'
import { OrderSuccess } from './components/OrderSuccess'
import { PromoSection } from './components/PromoSection'
import { OrderProvider } from './context/OrderContext'

function App() {
  return (
    <OrderProvider>
      <Header />
      <main>
        <Hero />
        <div className="relative z-10 space-y-8 pt-4">
          <FulfillmentToggle />
          <PromoSection />
          <MenuSection />
        </div>
        <Footer />
      </main>
      <OrderBar />
      <CartSheet />
      <OrderSuccess />
    </OrderProvider>
  )
}

export default App
