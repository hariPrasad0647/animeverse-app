import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./Components/Header"
import MainHome from "./Components/MainHome"

import AnimeHome from "./Components/animeverse/AnimeHome"
import AnimeItemDetails from "./Components/animeverse/animeItemDetails"


import SignUpForm from './Components/signUpForm'
import Login from './Components/loginForm'



import './App.css';

const App = () => (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path = "/" Component={MainHome} />
          <Route exact path ="/anime/:id" Component={AnimeItemDetails}/>
          <Route exact path ="/animeHome" Component={AnimeHome} />

          <Route exact path='/register' Component={SignUpForm} />
          <Route exact path ='/login' Component={Login}/>
        </Routes> 
        
    </BrowserRouter>
)

export default App;
