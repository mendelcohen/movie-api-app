import React, {useState, useEffect} from 'react'
import Home from "./Home"
import MovieApi from "./MovieApi"
import MovieRatings from "./MovieRatings"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./navbar"

function App() {

  const [ db, setDb ] = useState({})
  const [showNav, setShowNav] = useState(sessionStorage.getItem("showNav"))
  
  useEffect(() => {
    const keys = Object.keys(localStorage)
    const data = {}
    for (const key of keys) {
      data[key] = JSON.parse(localStorage.getItem(key))
    }
    console.log(data)
    setDb(data)
  }, [])

  function likedMovie(movie) {
    let savedMovie = db[movie.imdbID]
    if (savedMovie) {
      savedMovie.likes += 1
    } else {
      savedMovie = {
        title: `${movie.Title}, ${movie.Year}`,
        likes: 1, 
        dislikes: 0
      }
    }
    localStorage.setItem(movie.imdbID, JSON.stringify(savedMovie))
    setDb({[movie.imdbID]: savedMovie, ...db})
    console.log(db)
  }

  function dislikedMovie(movie) {
    let savedMovie = db[movie.imdbID]
    if (savedMovie) {
      savedMovie.dislikes += 1
    } else {
      savedMovie = {
        title: `${movie.Title}, ${movie.Year}`,
        likes: 0, 
        dislikes: 1
      }
    }
    localStorage.setItem(movie.imdbID, JSON.stringify(savedMovie))
    setDb({[movie.imdbID]: savedMovie, ...db})
    console.log(db)
  }

  return (
    <Router>
    <Navbar showNav={showNav} setShowNav={setShowNav}/>
      <Switch>
        <Route exact path='/' render={props => <Home {...props} showNav={showNav} setShowNav={setShowNav}/>}/>
        <Route path='/MovieApi' render={props => <MovieApi {...props} db={db} likedMovie={likedMovie} dislikedMovie={dislikedMovie} showNav={showNav} setShowNav={setShowNav}/>}/>
        <Route path='/MovieRatings' render={props => <MovieRatings {...props} db={db}/>}/>
      </Switch>
    </Router>
  )
}

export default App;
