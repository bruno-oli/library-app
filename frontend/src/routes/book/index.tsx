import { api } from '@/api/api'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { CartContext } from '@/context/cart-context'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Book = () => {
  const { id } = useParams()
  const { toast } = useToast()

  const [book, setBook] = useState<IBook | null>(null)

  const { products, setProducts } = useContext(CartContext)

  useEffect(() => {
    async function loadBook() {
      try {
        const response = await api.get<IBook>(`/book/${id}`)

        setBook(response.data)
      } catch {
        setBook(null)
      }
    }

    loadBook()
  }, [id])

  function addBookToCart(cartItem: ICartProduct) {
    if (products.find((product) => product.id === cartItem.id)) {
      return toast({
        title: 'Erro',
        description: 'Esse livro ja está no seu carrinho!',
        variant: 'destructive',
      })
    }

    setProducts([...products, cartItem])
  }

  return (
    <main>
      <Header />

      {book ? (
        <section className="container flex items-start justify-between gap-6">
          <img className="w-1/3" src={book.image} alt="" />

          <div className="max-w-3xl space-y-5 mt-8">
            <h1 className="text-3xl font-bold text-primary-foreground">
              {book.name}
            </h1>
            <span className="text-base text-muted-foreground">
              Autor(a): <span className="italic">{book.author}</span>
            </span>

            <p className="text-lg leading-7 text-muted-foreground line-clamp-[15]">
              {book.description}
            </p>

            <span className="block text-5xl font-bold text-primary">
              {Number(book.price_in_cents / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>

            <span className="text-sm italic text-muted-foreground">
              Restam {book.stock} unidades...
            </span>

            {book.stock ? (
              <Button
                className="block"
                onClick={() =>
                  addBookToCart({
                    id: book.id,
                    name: book.name,
                    image: book.image,
                    price_in_cents: book.price_in_cents,
                    quantity: 1,
                  })
                }
              >
                Adicionar ao carrinho
              </Button>
            ) : (
              <Button
                className="block cursor-not-allowed"
                disabled
                variant={'destructive'}
              >
                Fora de estoque
              </Button>
            )}
          </div>
        </section>
      ) : (
        <div className="container flex items-start justify-between gap-6">
          <Skeleton className="w-1/3" />
          <Skeleton className="max-w-3xl space-y-5 mt-8" />
        </div>
      )}
    </main>
  )
}

export { Book }
