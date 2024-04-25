import React, { useState, useEffect } from 'react';
import './Etusivu.css';

export default function Etusivu() {
  const [error, setError] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [areaId, setAreaId] = useState("1018");
  const [selectedDate, setSelectedDate] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchTodaySchedule = async () => {
      try {
        const parser = new DOMParser();
        const url = `https://www.finnkino.fi/xml/Schedule/?area=${areaId}&dt=${selectedDate}`;
    
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch schedule. Status code: ${response.status}`);
        }
        
        const xmlData = await response.text();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const showElements = xmlDoc.querySelectorAll("Show");
        const moviesData = [];
        
        showElements.forEach((showElement) => {
          const eventSmallImagePortrait = showElement.querySelector("EventSmallImagePortrait");
          const imageUrl = eventSmallImagePortrait.textContent;
          const ShowURLElement = showElement.querySelector("ShowURL");
          const ShowURL = ShowURLElement.textContent;
          const TheatreAuditoriumElement = showElement.querySelector("TheatreAndAuditorium");
          const TheatreAuditorium = TheatreAuditoriumElement.textContent;
          
          const showStartElement = showElement.querySelector("dttmShowStart");
          const showStart = showStartElement.textContent;
          let date = new Date(showStart);
          date = date.toLocaleTimeString("fi-FI", {
            timeZone: "Europe/Helsinki",
            hour: "2-digit",
            minute: "2-digit",
          });
    
          moviesData.push({
            imageUrl,
            ShowURL,
            TheatreAuditorium,
            date,
          });
        });
        
        setTodaySchedule(moviesData);
      } catch (error) {
        setError(error);
      }
    };

    const fetchNews = async () => {
      try {
        const parser = new DOMParser();
        const response = await fetch(`https://www.finnkino.fi/xml/News/?`);
        if (!response.ok) {
          throw new Error(`Failed to fetch news. Status code: ${response.status}`);
        }
        const xmlData = await response.text();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const newsElements = xmlDoc.getElementsByTagName('NewsArticle');
        const newsData = Array.from(newsElements).map((article) => ({
            Title : article.querySelector('Title').textContent,
            ArticleURL : article.querySelector('ArticleURL').textContent,
            ImageURL : article.querySelector('ImageURL').textContent,
          }));

        setNews(newsData);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchTodaySchedule();
    fetchNews();
  }, []);

  return (
    <div className='etusivu'>
      <div className='etusivu-teksti'>
        <h3>Tervetulo elokuva harrastelijoiden sivulle!</h3>
        <br></br>
        <p>
          Täällä sinä voit etsiä elokuvia ja sarjoja. Katsoa mitä elokuvia pyörii elokuvateattereissa. 
          Voit lukea myös muiden ihmisten arvosteluja elokuvista ja sarjoista.
          Kirjautuneena voit lisätä elokuvia ja sarjoja omaan suosikkilistaan. Pystyt luomaan ryhmiä ja hallitsemaan niitä.
          Ryhmän luojana sinä voit lähetää liittymispyyntöjä ja hyväksymään niitä. Voit halutessasi poistaa myös ryhmän jäseniä. 
          Kirjautuneena sinä voit lähettää erilaisiin ryhmiin liittymispyyntöjä, jotka ovat kiinnostuneet samalaisista elokuvista kuin sinä.
          Ryhmän jäsenenä voit lisätä ryhmään elokuvia, sarjoja ja näytösaikoja ryhmän sivulle.
        </p>
        <p>
          Ensimmäisenä aloita luomaan käyttäjä itsellesi, jonka jälkeen pääset kirjautumaan sivustolle ja sen jälkeen olet valmis tekemään siitä itsesi näköisen.

        </p>
      </div>

      <div className='etusivu-näytökset'>
        <h2>Tänään elokuvateatterissa:</h2>
        {todaySchedule.map((movie, index) => (
          <div key={index} className="etusivu-movie-container">
            <a href={movie.ShowURL}>
            <img src={movie.imageUrl} alt="etusivu-elokuva-kuva" />
            </a>
            <p>{movie.date}</p>
          </div>
        ))}
      </div>

      <div className='etusivu-uutiset'>
        <div className='etusivu-uutiset-otsikko'>
          <h2>Ajankohtaista:</h2>
        <div className='etusivu-uutiset-container'>
          {news.map((article) => (
          <div key={article.Title} className='etusivu-uutiset-info'>
            {article.Title && (
              <a href={article.ArticleURL}>
                <img src={article.ImageURL} alt={article.Title} className='etusivu-uutiset-kuva' />
                <h3>{article.Title}</h3>
              </a>
            )}
            </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
