import {Link} from 'react-router-dom'
//import AnimeHome from '../animeverse/AnimeHome'
import './index.css'


const MainHome = () =>{
    return(
        <div className="maninContainer">
            <div>
                <Link to="/animeHome"><button className='Buttons'>AnimeVerse</button></Link>
                {/* <Link to="/mangaHome"><button className='Buttons'>MangaVerse</button></Link> */}
            </div>
        </div>
    )
}

export default MainHome