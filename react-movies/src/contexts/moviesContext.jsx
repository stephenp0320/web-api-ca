import React, { useState } from "react";
import { login, signup } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([])
  const [myReviews, setMyReviews] = useState({})
  const [mustWatch, setMustWatch] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");


  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token){
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  }

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100)
  }

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addToWatchlist = (movie) => {
    let newWatchlist = [];
    if (!watchlist.includes(movie.id)) {
      newWatchlist = [...watchlist, movie.id];
    } else {
      newWatchlist = [...watchlist];
    }
    setWatchlist(newWatchlist)
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };


  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
  };

  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const updated = [...mustWatch, movie.id];
      setMustWatch(updated)
      console.log("list of must watch, ", updated)
    } else {
      console.log("already in must watch list, ", movie.id);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter(
      (mId) => mId !== movie.id
    ))
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
