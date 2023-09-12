import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import { MovieCard } from "../components/MovieCard";
import PosterImage from "../assets/images/poster.png";
import tomatoImg from "../assets/images/tomato.svg";
import imdbImg from "../assets/images/imdb.svg";
import play from "../assets/images/play.svg";
import chevron_right from "../assets/images/chevron-right.svg";
import { Footer } from "../components/Footer";

export const Home = () => {
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

  console.log(movies);

  return (
    <>
      
      <main>
        <div
          className="
        relative
        h-[650px]
        w-full md:min-h-[600px]
        "
        >
          <Header />

          <img
            className="
              
              h-5/6 w-screen object-cover md:h-full 
              
              "
            src={PosterImage}
            alt="poster"
          />

          <div className="absolute  top-[2em] flex h-5/6 w-full items-center text-white  md:top-[1em]  md:h-full ">
           
           
            <div className=" mx-auto flex w-full max-w-[1244px] items-center justify-between px-4 ">
              <div className=" flex h-auto w-full flex-col items-start justify-start gap-[16px] md:w-[450px] ">
                <h1 className="text-2xl font-medium leading-[56px]  md:text-4xl">
                  John Wick 3 : Parabellum
                </h1>
                <div className="flex w-full items-center justify-start gap-10">
                  <div className="flex w-auto items-center gap-3">
                    <img
                      src={imdbImg}
                      alt="imdb"
                      
                    />
                    <span className="">86.0 / 100</span>
                  </div>
                  <div className="flex w-auto items-center gap-3">
                    <img src={tomatoImg}  alt="tomato" />
                    <span className="">97%</span>
                  </div>
                </div>
                <p className="text-base font-medium md:text-lg  ">
                  John Wick is on the run after killing a member of the
                  international assassins&rsquo; guild, and with a $14 million
                  price tag on his head, he is the target of hit men and women
                  everywhere.
                </p>
                <button className="flex  items-center justify-center gap-2
                rounded-md  bg-[#BE123C] px-4 py-2
                ">
                <img src={
                      play
                    }
                    className="mr-2 h-[20px] w-[20px]"  
                    
                    alt="play" />
                  <span className="text-[12px] md:text-[14px] ">
                    
                    WATCH TRAILER
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>{loading && <p>Loading...</p>}</div>

        <div>{error && <p>Error: {error}</p>}</div>
        <TopMovies>
          {movies &&
            movies.results
              .slice(0, 10)
              .map((movie) => <MovieCard movie={movie} key={movie.id} />)}
        </TopMovies>
      </main>
      <Footer />
    </>
  );
};

const TopMovies = ({ children }) => {
  return (
    <div className="relative mx-auto mt-8 max-w-[1244px]
    px-2 
    ">
      <div className="mb-12 flex items-center justify-between px-2">
        <h1
          className=" text-2xl font-bold
      md:text-3xl
      "
        >
          Top Movies
        </h1>
        <p className="flex
        items-center justify-center gap-2 text-[#BE123C]
        ">
          <span
          className="text-base md:text-lg"
          >
          See more
          </span>
        
        <img src={chevron_right} alt="chevron_right" className="w-5 " />

        </p>
      </div>
      <div
        className="mx-auto grid max-w-[1244px] grid-cols-2  justify-items-center 
          gap-4 gap-y-8  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          
          "
      >
        {children}
      </div>
    </div>
  );
};
