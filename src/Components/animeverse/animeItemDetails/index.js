import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from "react-spinners";
import './index.css'

const AnimeItemDetails = () => {
  const { id } = useParams(); // get the :id from URL
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setLoad] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SINGLE_ANIME}${id}`);
        const data = await response.json();
        console.log(data);
        setItemDetails(data.data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    fetchAnimeDetails();
    setLoad(false)
  }, [id]);

  if (!itemDetails) return <BeatLoader/>;

  return (
    <body className ="body-container" style={{backgroundImage: `url(${itemDetails.images.webp.large_image_url}`}}>
      {isLoading ? (<BeatLoader/>) : 
      (
        <>
        <div className="container">
          <div className="movie-details">
            <div className="poster">
              <img className='each-anime-poster' src={itemDetails.images.jpg.image_url} alt="Another Simple Favor Poster" />
              <button className="download-button">⬇ Download</button>
            </div>
            <div className="details">
              <h1>{itemDetails.title}</h1>
              <div className="info">{itemDetails.year} | {itemDetails.genres[0].name}</div>
              <div className="available">
                <strong>Episodes: </strong> 
                <span>{itemDetails.episodes}</span> | 
                <span>{itemDetails.rating}</span>
              </div>
              <div className="rating">
                <span>💚 popularity: {itemDetails.popularity}</span>
                <span>⭐ rating {itemDetails.score} ({itemDetails.scored_by})</span>
              </div>
            </div>
          </div>
      
      
        </div>
      
        <div>
          <iframe title={itemDetails.title} src={itemDetails.trailer.embed_url} className='trailer-iframe'></iframe>
          
        </div>
        </> 
      )}
    </body>
  );
};

export default AnimeItemDetails;
