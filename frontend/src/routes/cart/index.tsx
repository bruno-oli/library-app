import { Header } from '@/components/header'
import { CartContext } from '@/context/cart-context'
import { useContext } from 'react'

const Cart = () => {
  const { products } = useContext(CartContext)

  return (
    <main>
      <Header />
    </main>
  )
}

export { Cart }
