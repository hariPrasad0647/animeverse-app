import { useContext} from "react";
import { likedContext } from "../Context";
import SingleLikedAnimeComponent from "../animeverse/SingleLikedAnimeComponent";
import './index.css'
const Liked = () => {
  const { likedAnimeList } = useContext(likedContext);
  console.log(likedAnimeList) 
  
  return (
  <div className="liked-container">
      <div className="text-container">
        <h1>Liked Animes</h1>
      </div>
      <div className="liked-anime-container">
        {likedAnimeList.map((each) => (
          <SingleLikedAnimeComponent key={each.id} each={each} />
        ))}
      </div>
    </div>
  
  );
};

export default Liked;
