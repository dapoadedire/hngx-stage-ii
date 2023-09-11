import { Link } from "react-router-dom";
import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import tv from "../assets/images/tv.svg";
import menu from "../assets/images/menu.svg";
import search from "../assets/images/search.svg";


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
    <header 
    className="absolute top-2 z-10 my-auto w-full py-8 text-white "
    >
     <div
     className="mx-auto flex max-w-[1244px] items-center justify-between  px-4 "
     >
      <div
      className="flex items-center space-x-3"
      >
        <img
        src={tv}
        alt="tv"
        className="w-7"
        />

       <span
       className="text-xl font-bold"
       >
         MovieBox
       </span>
      </div>
   
      <div>
        <form action="" onSubmit={handleSubmit}
        className="flex w-full items-center justify-between space-x-2 rounded-md  border bg-transparent p-2 md:w-[400px] lg:w-[500px]   "
        >
          <input
            type="text"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-200"
            placeholder="What do you want to watch?"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <button type="submit">
            <img src ={search} alt="search" className="w-5" />
          </button>
        </form>
        {/* {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {movies && <p>Data loaded successfully!</p>} */}
      </div>
      <nav className="">
       <ul
       className="flex items-center space-x-6"
       >
          
          <li
          className="text-lg font-bold"
          >
           <a href="/" className="">Sign In</a>
          </li>
          <li>
            <img src={menu} alt="menu" className="w-8" />
          </li>
       </ul>
      </nav>
     </div>
    </header>
  );
};

