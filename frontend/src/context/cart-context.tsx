import { createContext, useEffect, useState } from 'react'

interface ICartContext {
  products: ICartProduct[]
  setProducts: (products: ICartProduct[]) => void
}

interface ICartContextProvider {
  children: React.ReactNode
}

const CartContext = createContext<ICartContext>({} as ICartContext)

const CartContextProvider = ({ children }: ICartContextProvider) => {
  const [products, setProducts] = useState<ICartProduct[]>([])

  useEffect(() => {
    function loadCart() {
      const storedCart = JSON.parse(
        localStorage.getItem('cart') || '[]',
      ) as ICartProduct[]

      if (storedCart.length) {
        setProducts(storedCart)
      }
    }

    loadCart()
  }, [])

  useEffect(() => {
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(products))
    }

    saveCart()
  }, [products])

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartContextProvider }
