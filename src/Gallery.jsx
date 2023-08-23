import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`

const Gallery = () => {
  const { searchValue } = useGlobalContext()
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['images', searchValue],
    queryFn: () => axios.get(`${url}&query=${searchValue}`),
  })

  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  const images = data.data.results

  const pages = data.data.total_pages

  if (images < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    )
  }

  return (
    <section className="image-container">
      {images.map((image) => {
        return (
          <img
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
            className="img"
          />
        )
      })}
    </section>
  )
}
export default Gallery
