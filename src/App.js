import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./Components/Header"
import MainHome from "./Components/MainHome"
import AnimeHome from "./Components/animeverse/AnimeHome"
import AnimeItemDetails from "./Components/animeverse/animeItemDetails"
import Liked from './Components/liked'
import SignUpForm from './Components/signUpForm'
import Login from './Components/loginForm'
import PrivateRoute from './Components/privateRoute'

import { LikedContextProvider } from './Components/Context'

import './App.css'

const App = () => (
  <LikedContextProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/anime/:id" element={<AnimeItemDetails />} />
        <Route path="/animeHome" element={<AnimeHome />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 Protected Route */}
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <Liked />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </LikedContextProvider>
)

export default App
