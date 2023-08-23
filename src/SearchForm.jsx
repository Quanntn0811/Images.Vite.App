import { useQueryClient } from '@tanstack/react-query'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const { setSearchValue } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.search.value
    if (!searchValue) return
    setSearchValue(searchValue)
  }

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="dog"
          className="form-input search-input"
          //   value={searchValue}
          //   onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  )
}
export default SearchForm
