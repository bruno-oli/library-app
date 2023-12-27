import { Header } from '@/components/header'
import { FeaturedBooks } from '@/components/main/featured-books'

const Home = () => {
  return (
    <main className="container">
      <Header />

      <FeaturedBooks />
    </main>
  )
}

export { Home }
