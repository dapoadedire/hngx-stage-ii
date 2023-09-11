import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";

export const Home = () => {
  const [randomMovie, setRandomMovie] = useState(null); 
  const { movies, setMoviesData } = useMovieContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

  const fetchMovies = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      };
      const response = await fetch(`${API_URL}`, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMoviesData(data); 
      setLoading(false); 
    } catch (error) {
      setError(error); 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const randomInt = Math.floor(Math.random() * (100 - 20 + 1) + 20);

  const fetchRandomMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${randomInt}?language=en-US`,
      options,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setRandomMovie(data);
  };

  useEffect(() => {
    fetchRandomMovie();
  }
  , []);

  console.log(randomMovie);


  console.log(movies);

  return (
    <>
      <Header />
      <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="">
         

          {randomMovie && (
            <img
              className=""
              src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
              alt={randomMovie.title}
            />
          )}
        </div>

        <div>{loading && <p>Loading...</p>}</div>

        <div>{error && <p>Error: {error}</p>}</div>
        {movies &&
          movies.results.slice(0, 10).map((movie) => (
            <div key={movie.id} data-testid="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                data-testid="movie-poster"
              />
              <div>
                <h2 data-testid="movie-title">{movie.title}</h2>
                <p data-testid="movie-release-date">{movie.release_date}</p>
                <Link to={`/movies/${movie.id}`}>View Details</Link>
              </div>
            </div>
          ))}
      </main>
    </>
  );
};
