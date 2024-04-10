import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Haku.css";

export default function Haku() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [year, setYear] = useState('');
  const [years, setYears] = useState([]);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
 

  const getMovies = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
      if (searchQuery === '') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&primary_release_year=${year}`;
      }

      let allMovies = [];
      let page = 1;
      let totalPages = 1;
  
      while (page <= totalPages) {
        const response = await axios.get(`${url}&page=${page}`);
        allMovies = [...allMovies, ...response.data.results];
        totalPages = response.data.total_pages;
        if (page >= response.data.total_pages || allMovies.length >= 100) {
          break;
        }
        page++;
      }
  
      setMovies(allMovies);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching movies: ', err);
      setLoading(false);
    }
  };

  const getGenres = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
      const response = await axios.get(url);
      setGenres(response.data.genres);
    } catch (err) {
      console.error('Error fetching genres: ', err);
    }
  };

  const getYears = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const yearsArray = Array.from({length: 60}, (_, index) => currentYear - index);
      setYears(yearsArray);
    } catch (err) {
      console.error('Error fetching years: ', err);
    }
  };

  useEffect(() => {
    getGenres();
    getYears();
  }, []);

  useEffect(() => {
    getMovies();
  }, [searchQuery, year, genre]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleClick = () => {
    getMovies();
  };

  return (
    <div id='haku-container'>
      <div>
        <input value={searchQuery} onChange={handleInputChange} placeholder="Search for a movie"/>
        <select value={genre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <select value={year} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {years.map((yr, index) => (
            <option key={index} value={yr}>{yr}</option>
          ))}
        </select>
        <button onClick={handleClick}>Search</button>
      </div>
      <div>
        {movies.map((movie) => (
           <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
        ))}
      </div>
    </div>
  );
}