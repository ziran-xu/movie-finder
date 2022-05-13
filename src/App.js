import logo from './movie-icon.png';
import noImage from './no-image.jpg';
import './App.css';
import { useEffect, useState } from 'react';
import { myApiKey } from './helper.js';

function App() {

  const [movieResults, setMovieResults] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    updateMovies(searchWord)
  }, [searchWord]);

  const updateMovies = async () => {
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&s=${searchWord}`
    const response = await fetch(url);
    const responseJson = await response.json();

    setMovieResults(responseJson)
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
          {movieResults.Search ? movieResults.Search.map((movie) => {return (<MovieComponent movie = {movie}/>)}) : null}
          {movieResults.Error && searchWord ? <div className="Error-message">{movieResults.Error}</div> : null}
        </div>
      </div>
    </div>
  );
}

function MovieComponent(props) {
  return (
    <div>
      <h1>{props.movie.Title} ({props.movie.Year})</h1>
      <img className="Poster" src={props.movie.Poster} onError={(e)=>{e.target.onerror = null; e.target.src=noImage}} alt="movie-poster"/>
      <div><button>Display Label</button></div>
    </div>
  )
}

export default App;
