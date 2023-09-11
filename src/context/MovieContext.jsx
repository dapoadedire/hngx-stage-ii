import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(null);

  const setMoviesData = (data) => {
    setMovies(data);
  };

  return (
    <MovieContext.Provider value={{ movies, setMoviesData }}>
      {children}
    </MovieContext.Provider>
  );
};
