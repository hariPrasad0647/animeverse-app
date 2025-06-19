import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import SingleAnimeList from '../SingleAnimeList';
import { likedContext } from '../../Context';
import './index.css';

const AnimeItemDetails = () => {
  const { id } = useParams();
  const [watchOptions, setWatchOptions] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const { likedAnimeList, addToLiked, removeFromLiked } = useContext(likedContext);
  const isLiked = likedAnimeList.some(anime => anime.id === Number(id));

  const handleLikeToggle = () => {
    if (!itemDetails) return;
    const animeData = {
      id: itemDetails.mal_id,
      smallImage: itemDetails.images.jpg.small_image_url,
      title: itemDetails.title,
      popularity: itemDetails.popularity,
      rating: itemDetails.rating,
    };
    isLiked ? removeFromLiked(animeData.id) : addToLiked(animeData);
  };

  const fetchAnimeDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SINGLE_ANIME}${id}`);
      const data = await response.json();
      setItemDetails(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching anime details:', error);
      setIsLoading(false);
    }
  };

  const fetchWatchOptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_STREAMING_API}${id}/streaming`);
      const data = await response.json();
      setWatchOptions(data.data || []);
    } catch (error) {
      console.error('Error fetching watch options:', error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_RECCOMENDATIONS);
      const data = await response.json();
      console.log(data)
      const finalSuggestedData = data.data.slice(0, 10).map(item => {
        const entry = item.entry[0];
        return {
          id: entry.mal_id,
          title: entry.title,
          imageUrl: entry.images?.jpg?.image_url
        };
      });
      console.log(finalSuggestedData)
      setSuggestions(finalSuggestedData);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
    fetchWatchOptions();
    fetchSuggestions();
  }, [id]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  const renderWatchOptions = () => {
    if (watchOptions.length === 0) {
      return <p>No Watch Options Available</p>;
    }
    return (
      <div className="watch-options">
        {watchOptions.map((option, index) => (
          <a key={index} href={option.url} target="_blank" rel="noopener noreferrer">
            <button className="watch-option-button">
              {option.name} 🎬
            </button>
          </a>
        ))}
      </div>
    );
  };

  if (isLoading || !itemDetails) {
    return (
      <div className="loader">
        <BeatLoader color="#00ffcc" />
      </div>
    );
  }

  return (
    <div
      className="body-container"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(${itemDetails.images.webp.large_image_url})`
      }}
    >
      <div className="container">
        <div className="movie-details">
          <div className="poster">
            <img
              className="each-anime-poster"
              src={itemDetails.images.jpg.image_url}
              alt={itemDetails.title}
            />
          </div>

          <div className="details">
            <h1 className="title">{itemDetails.title}</h1>
            <div className="info">
              {itemDetails.year} | {itemDetails.genres?.[0]?.name || 'Unknown Genre'}
            </div>

            <div className="available">
              <strong>Episodes:</strong> {itemDetails.episodes} | {itemDetails.rating}
            </div>

            <div className="rating">
              <span>💚 Popularity: {itemDetails.popularity}</span>
              <span>⭐ Rating: {itemDetails.score} ({itemDetails.scored_by})</span>
            </div>

            <div className="like-button-container">
              <button className="like-button" onClick={handleLikeToggle}>
                <p>
                  {isLiked ? 'Liked' : 'Like'}{' '}
                  <FontAwesomeIcon
                    icon={isLiked ? solidHeart : regularHeart}
                    style={{ color: isLiked ? '#f70202' : '#FFD43B' }}
                  />
                </p>
              </button>
            </div>

            <div className="watchOptions">
              <p className="watch-options-para">Watch Options 🍿</p>
              {renderWatchOptions()}
            </div>
          </div>
        </div>
      </div>

      {itemDetails.trailer?.embed_url && (
        <div className="trailer-section">
          <iframe
            title={itemDetails.title}
            src={itemDetails.trailer.embed_url}
            className="trailer-iframe"
            allowFullScreen
          />
        </div>
      )}

      <div className="carousel-section">
        <h1>You Might Also Like</h1>
        <Carousel responsive={responsive} itemClass="carousel-item-padding" className="suggestions-carousel">
            {suggestions.map(anime => (
            <div key={anime.id} className="carousel-card-wrapper">
              <SingleAnimeList
              id={anime.id}
              eachAnimeDetail={anime.imageUrl}
              title={anime.title}
              />
            </div>
             ))}
        </Carousel>
 
      </div>
      

    </div>
  );
};

export default AnimeItemDetails;
