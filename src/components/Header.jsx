import { Link } from "react-router-dom";
import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import tv from "../assets/images/tv.svg";
import menu from "../assets/images/menu.svg";
import search from "../assets/images/search.svg";
import { useLoadingError } from "../context/LoadingErrorContext";

export const Header = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const {  setMoviesData } = useMovieContext(); 
  const { setLoading, setError } = useLoadingError();
  

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
    className="absolute top-2 z-20 my-auto w-full py-2 md:py-4  text-white "
    >
     <div
     className=" relative mx-auto flex max-w-[1244px] items-center justify-between  px-4 "
     >
      <div
      className="flex items-center space-x-2 mr-3"
      >
        <img
        src={tv}
        alt="tv"
        className="w-6"
        />

       <span
       className=" font-bold
        md:text-2xl
       "
       >
         MovieBox
       </span>
      </div>
   
      <div
      className="absolute top-10 px-4 right-0 left-0 flex items-center space-x-2 md:top-0 md:px-0 md:right-4 md:relative md:space-x-4"
      >
        <form action="" onSubmit={handleSubmit}
        className="flex
        
        w-full items-center justify-between space-x-2 rounded-md  border bg-transparent p-2 md:w-[400px] lg:w-[500px]   "
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
       
      </div>
      <nav className="">
       <ul
       className="flex items-center space-x-3 md:space-x-4"
       >
          
          <li
          className="text-lg font-bold
          hidden md:block

          "
          >
           <Link to="/">Sign In</Link>
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

