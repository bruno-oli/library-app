import { UserAuthContext } from '@/context/user-auth-context'
import { useContext, useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { api } from '@/api/api'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { Link } from 'react-router-dom'

const FeaturedBooks = () => {
  const { user, isAuthenticated } = useContext(UserAuthContext)

  const [books, setBooks] = useState<IBook[]>([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await api.get<IGetBooksResponse>(
          '/book?featured=true&orderBy=createdAt&order=asc',
        )

        setBooks(response.data.books)
      } finally {
        setIsFetching(false)
      }
    }

    loadBooks()
  }, [])

  return (
    <section className="container mt-10 w-full">
      <h1 className="font-thin text-2xl">
        Olá
        {isAuthenticated && (
          <span className="font-bold text-primary">
            {' '}
            {user?.name.split(' ')[0]}
          </span>
        )}
        , esses são os livros em destaque da semana:
      </h1>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full mt-5"
      >
        <CarouselContent>
          {isFetching ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="lg:basis-1/4 sm:basis-1/2">
                  <div>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Skeleton className="w-full h-full" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </>
          ) : (
            <>
              {books.map((book) => (
                <CarouselItem
                  className="lg:basis-1/4 sm:basis-1/2"
                  key={book.id}
                >
                  <Link
                    key={book.id}
                    to={`/book/${book.id}`}
                    className="lg:basis-1/4 sm:basis-1/2 h-full"
                  >
                    <div>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="flex flex-col justify-items-start overflow-hidden">
                            <img
                              src={book.image}
                              alt={book.image}
                              className="w-full h-full mb-2"
                            />

                            <h2 className="font-medium text-lg truncate">
                              {book.name}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                              {book.author}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {Number(book.price_in_cents / 100).toLocaleString(
                                'pt-BR',
                                {
                                  style: 'currency',
                                  currency: 'BRL',
                                },
                              )}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export { FeaturedBooks }
