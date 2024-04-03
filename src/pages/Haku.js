import React, { useState, useEffect } from 'react';

export default function Haku() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '10faf346c52d560855a69dd8246276e0';
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        alert();
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, year, genre]);

  const handleInputChange = (event) => {
    setGenre('');
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSearchQuery(''); 
    setGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSearch = () => {
    setMovies([]);
  };

  return (
    <div>
      <div>
        <input value={searchQuery} onChange={handleInputChange} placeholder="Search for a movie"/>
        <select value={genre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>

        </select>
        <select value={year} onChange={handleYearChange}>
          <option value="">Select year</option>

        </select>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          movies.map(movie => (
            <div key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h4>{movie.title}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
