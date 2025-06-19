import { Link } from 'react-router-dom';
import './index.css';

const SingleAnimeList = props => {
  const { eachAnimeDetail, id, title } = props;

  return (
    <Link to={`/anime/${id}`} className="each-anime-item-container">
      <div className="anime-card">
        <div
          className="thumbnail-container"
          style={{ backgroundImage: `url(${eachAnimeDetail})` }}
        />
        <div className="title-container">
          <p className="name">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleAnimeList;

