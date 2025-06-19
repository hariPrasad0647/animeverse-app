import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import SingleAnimeList from '../SingleAnimeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BeatLoader } from 'react-spinners';

const Home = () => {
  const [animePages, setAnimePages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'latest';

    if (type === 'top') {
      getTopAnime(1);
    } else if (type === 'recommended') {
      getSuggestedAnimes(1);
    } else {
      getAnimeList(1);
    }
  }, [location.search]);

  const getAnimeList = async (page = 1) => {
    setAnimePages({});
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_GET_ANIME_LIST}&page=${page}`);
      const data = await response.json();
      const mappedAnime = data.data.map(item => ({
        imageURL: item.images?.jpg?.image_url || '',
        small_imageURL: item.images?.jpg?.small_image_url || '',
        id: item.mal_id,
        title: item.title,
        year: item.year || '',
      }));
      setAnimePages({ [page]: mappedAnime });
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching anime list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTopAnime = async (page = 1) => {
    setAnimePages({});
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_GET_TOP_ANIME}&page=${page}`);
      const data = await response.json();
      const mappedAnime = data.data.map(item => ({
        imageURL: item.images?.jpg?.image_url || '',
        small_imageURL: item.images?.jpg?.small_image_url || '',
        id: item.mal_id,
        title: item.title,
        year: item.year || '',
      }));
      setAnimePages({ [page]: mappedAnime });
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching top anime:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestedAnimes = async (page = 1) => {
    setAnimePages({});
    setIsLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_GET_RECCOMENDATIONS);
      const data = await response.json();
      const mappedAnime = data.data.map(item => ({
        imageURL: item.entry[0]?.images?.jpg?.large_image_url || '',
        small_imageURL: item.entry[0]?.images?.jpg?.small_image_url || '',
        id: item.entry[0]?.mal_id || '',
        title: item.entry[0]?.title || '',
        year: item.year || '',
      }));
      setAnimePages({ [page]: mappedAnime });
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching recommended anime:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const getSearchResults = () => {
    const currentAnime = animePages[currentPage] || [];
    return currentAnime.filter(anime =>
      anime.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const goToPage = (pageNumber) => {
    if (!animePages[pageNumber]) {
      const queryParams = new URLSearchParams(location.search);
      const type = queryParams.get('type') || 'latest';

      if (type === 'top') {
        getTopAnime(pageNumber);
      } else if (type === 'recommended') {
        getSuggestedAnimes(pageNumber);
      } else {
        getAnimeList(pageNumber);
      }
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const filteredAnime = getSearchResults();

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <BeatLoader size={15} color="#00BFFF" />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <header className="header col-12 mb-4">
              <h1>
                Welcome to <span className="glow">MangaVerse</span>
              </h1>
              <p className="description">
                Your Ultimate Anime Destination. Dive into the vibrant world of anime with us!
                Whether you're a hardcore otaku or just getting started, AnimeVerse has something for everyone.
              </p>
              <div className="input-wrapper col-12 mb-4">
                <button className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff"
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff"
                      d="M22 22L20 20" />
                  </svg>
                </button>
                <input
                  placeholder="search.."
                  value={searchInput}
                  onChange={onChangeSearchInput}
                  className="input"
                  name="text"
                  type="text"
                />
              </div>
            </header>
          </div>

          <div className="filter-buttons-container">
            <button className="filter-button" onClick={() => navigate('/animeHome?type=top')}>Top Animes</button>
            <button className="filter-button" onClick={() => navigate('/animeHome?type=recommended')}>Recommended</button>
          </div>

          <hr />

          <div className="view">
            <div className="animelist-container row">
              {filteredAnime.map(anime => (
                <div key={anime.id} className="col-4 col-sm-6 col-md-4 col-lg-2 mb-4">
                  <SingleAnimeList
                    eachAnimeDetail={anime.imageURL}
                    id={anime.id}
                    title={anime.title}
                    year={anime.year}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pagination-buttons">
            {currentPage > 1 && (
              <button onClick={() => goToPage(currentPage - 1)} className="filter-button-previous">Previous</button>
            )}
            <button onClick={() => goToPage(currentPage + 1)} className="filter-button-previous">Next</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

