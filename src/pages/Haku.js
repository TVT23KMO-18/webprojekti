import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Haku.css";

export default function Haku() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [year, setYear] = useState('');
  const [years, setYears] = useState([]);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [mediaType, setMediaType] = useState('movie');
  const [error, setError] = useState('');

  const getMedia = async () => {
    try {
      setLoading(true);
      setError('');
      const apiKey = process.env.REACT_APP_API_KEY;
      let url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${searchQuery}`;
  
      if (searchQuery === '') {
        url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&with_genres=${genre}&primary_release_year=${year}`;
      }
  
      let allMedia = [];
      let page = 1;
      let totalPages = 1;
  
      while (page <= totalPages) {
        const response = await axios.get(`${url}&page=${page}`);
        allMedia = [...allMedia, ...response.data.results];
        totalPages = response.data.total_pages;
        if (page >= response.data.total_pages || allMedia.length >= 200) {
          break;
        }
        page++;
      }
  
      setMedia(allMedia);
    } catch (err) {
      console.error('Error fetching media: ', err);
      setError('Error fetching media. Please try again later.');
    } finally {
      setLoading(false);
    }
  };  

  const getGenres = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}`;
      const response = await axios.get(url);
      setGenres(response.data.genres);
    } catch (err) {
      console.error('Error fetching genres: ', err);
      setError('Error fetching genres. Please try again later.');
    }
  };

  const getYears = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const yearsArray = Array.from({length: 60}, (_, index) => currentYear - index);
      setYears(yearsArray);
    } catch (err) {
      console.error('Error fetching years: ', err);
      setError('Error fetching years. Please try again later.');
    }
  };

  useEffect(() => {
    getGenres();
    getYears();
  }, [mediaType]);

  useEffect(() => {
    getMedia();
  }, [searchQuery, year, genre, mediaType]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleClick = () => {
    getMedia();
  };

  return (
  <div id='haku-container'>
    <div className='painike'>
      <input value={searchQuery} onChange={handleInputChange} placeholder="Etsi elokuva tai sarja"/>
      <select value={mediaType} onChange={handleMediaTypeChange}>
        <option value="movie">Elokuva</option>
        <option value="tv">Sarja</option>
      </select>
      <select value={genre} onChange={handleGenreChange}>
          <option value="">Valitse genre</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <select value={year} onChange={handleYearChange}>
          <option value="">Valitse vuosi</option>
          {years.map((yr, index) => (
            <option key={index} value={yr}>{yr}</option>
          ))}
        </select>
        <button onClick={handleClick} disabled={loading}>{loading ? 'Lataa...' : 'Haku'}</button>
      </div>
      {error && <div>{error}</div>}
      <div className='elokuvaKansi'>
      {media.map((item, index) => (
        <div key={`${item.id}-${index}`}>
          {item.poster_path && (
          <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
           )}
  </div>
        ))}
      </div>
    </div>
  );
}
