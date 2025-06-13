import "./index.css"

const Header = () =>{
    return(
        <nav className="nav-container">
            <div>
                <img src="./logo.png" alt="logo" className="logo"/>
            </div>
            <div className="nav-container">
                <input type="search" placeholder="Quick Search" className="input-search"/>
                <p className="home">Home</p>
                <p className="home">4K</p>
                <p className="home">Browse Animes</p>
            </div>
        </nav>
    )
}

export default Header