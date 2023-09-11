import { Link } from "react-router-dom";
import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
export const Header = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const { movies, setMoviesData } = useMovieContext(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://api.themoviedb.org/3";
  const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;


  const fetchMovieByTitle = async (movieTitle) => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      };
      const response = await fetch(
        `${API_URL}/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
        options
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMoviesData(data); // Set the movies data in the context
      setError(null); // Clear any previous errors on successful fetch
    } catch (error) {
      setError(error.message);
      setMoviesData(null); // Clear any previous movies on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovieByTitle(movieTitle);
  };

  return (
    <header className="">
      <nav className="">
        <Link to="/" className="">
          Movie App
        </Link>
      </nav>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a movie"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {movies && <p>Data loaded successfully!</p>}
      </div>
    </header>
  );
};

