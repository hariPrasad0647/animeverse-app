
import { Link } from 'react-router-dom';
import './index.css';

const SingleLikedAnimeComponent = (props) => {
  const { title, id, popularity, rating, year, smallImage } = props.each;

  return (
      <Link to={`/anime/${id}`}>
    <div className="anime-card-wrapper">
      <div className="single-anime">
        <div className="small-image-container">
          <img className="small-image" src={smallImage} alt="anime" />
        </div>
        <div className="anime-details">
          <p className="like-para">{title}</p>
          <p className="like-para">{year}</p>
          <p className="like-para">{popularity}</p>
          <p className="like-para">{rating}</p>
        </div>
      </div>
    </div>
      </Link>
  );
};

export default SingleLikedAnimeComponent;
