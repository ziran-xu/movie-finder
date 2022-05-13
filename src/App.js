import logo from './movie-icon.png';
import noImage from './no-image.jpg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    updateMovies(searchWord)
  }, [searchWord]);

  const updateMovies = async () => {
    const url = `http://www.omdbapi.com/?apikey=256c6d40&s=${searchWord}`
    const response = await fetch(url);
    const responseJson = await response.json();

    setMovies(responseJson)
  }

  function handleChange(event) {
    setSearchWord(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Search for your favorite movies!</div>
        <input className="Search-bar" onChange={handleChange} placeholder="Movie Search"/>
      </header>
      <div className="Movie-list">
        <div>
          {movies.Search ? movies.Search.map((movie) => {
            return ( 
              <div>
                <h1>{movie.Title} ({movie.Year})</h1>
                <img className="Poster" src={movie.Poster} onError={(e)=>{e.target.onerror = null; e.target.src=noImage}}/>
                <div><button>Display Label</button></div>
              </div>)
          }): null}
          {movies.Error && searchWord ? <div className="Error-message">{movies.Error}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
