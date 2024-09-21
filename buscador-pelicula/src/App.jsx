import { useState, useEffect } from 'react'
import './App.css'
import responseMovies from "./mocks/with-results.json"
import withoutResults from "./mocks/not-results.json"
import { Movies } from "./components/Movies.jsx"



function App() {
  const movies = responseMovies.Search
  
  const [error, setError] = useState("null")
  function useSearch () {
    const [search, updateSearch] = useState("")
    
    useEffect(() =>{
      if (search.length === ""){
        setError("No se puede buscar una pelicula vacia")
        return
      }
      if (search < 3){
        setError("La busqueda debe tener al menos 3 caracteres")
        return
      }
      setError(null)
      
    }, [search])
    return({search, updateSearch, error })
  }
  
  console.log("render")

  const {search, updateSearch} = useSearch()
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log( { search } )
  }
  
  const handleChange = (event) =>{
    updateSearch(event.target.value)
  }
  
  
  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input 
          onChange={handleChange} 
          value={search} 
          name='query' 
          placeholder="Avengers, Star Wars, etc.." />

          <button type="submit">Buscar</button>
        </form>
        {error && <p>{error}</p>}
      </header>

      <main>
        <Movies movies= {movies} />
      </main>
    </div>
  )
}

export default App
