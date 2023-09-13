import { Header } from "../components/Header";
import {  useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import { MovieCard } from "../components/MovieCard";
import PosterImage from "../assets/images/poster.png";
import tomatoImg from "../assets/images/tomato.svg";
import imdbImg from "../assets/images/imdb.svg";
import play from "../assets/images/play.svg";
import chevron_right from "../assets/images/chevron-right.svg";
import { Footer } from "../components/Footer";
import { useLoadingError } from "../context/LoadingErrorContext";
import { Loading } from "../components/Loading";
export const Home = () => {
  const { movies, setMoviesData } = useMovieContext();

  const { loading, setLoading, error, setError } = useLoadingError();

  const API_URL =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

  const randomMovie = movies && movies.results.sort(() => Math.random() - Math.random()).slice(0, 1);

// const randomMovie=  [
//     {
//         "adult": false,
//         "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
//         "genre_ids": [
//             18,
//             80
//         ],
//         "id": 238,
//         "original_language": "en",
//         "original_title": "The Godfather",
//         "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
//         "popularity": 121.111,
//         "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
//         "release_date": "1972-03-14",
//         "title": "The Godfather",
//         "video": false,
//         "vote_average": 8.7,
//         "vote_count": 18610
//     }
// ]

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

 

  return (
    <>
      
      <main>
        <div
          className="
        relative
        
        
        h-[650px]
        w-full bg-[#494848]
        md:min-h-[600px]
        
        "
        >
          <Header />

          <img
            className=" w-screen object-cover h-full md:h-full
            
            "
            src={`https://image.tmdb.org/t/p/w500${randomMovie && randomMovie[0].backdrop_path}`}
            alt="poster"
          />

         

          {
            randomMovie && randomMovie.map((movie) => (

              <div 
              key={movie}
              className="absolute  top-[2em] flex h-5/6 w-full items-center text-white md:top-[1em]  md:h-full ">
           
           
              <div className=" mx-auto flex  w-full max-w-[1244px] items-center justify-between px-4 ">
                <div className=" flex h-auto w-full flex-col items-start justify-start gap-[16px] md:w-[450px] ">
                  <h1 className="text-2xl font-medium leading-[56px]  md:text-4xl">
                    {movie.title}
                  </h1>
                  <div className="flex w-full items-center justify-start gap-10">
                    <div className="flex w-auto items-center gap-3">
                      <img
                        src={imdbImg}
                        alt="imdb"
                        
                      />
                      <span className="">

                        {
                          movie.vote_average * 10
                        }/100
                      </span>
                    </div>
                    <div className="flex w-auto items-center gap-3">
                      <img src={tomatoImg}  alt="tomato" />
                      <span className="">
                        {
                          movie.vote_average * 10
                        } %
                      </span>
                    </div>
                  </div>
                  <p className="text-base font-medium md:text-lg  ">
                   {
                    movie.overview
                   }
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
            ))
          }
        </div>

        
       <div>
      {
        loading ? (
          <Loading />
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <TopMovies>
             {movies && movies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </TopMovies>
        )
      }
       </div>
      </main>
      <Footer />
    </>
  );
};

const TopMovies = ({ children }) => {
  return (
    <div className="relative mx-auto max-w-[1244px] px-2 
    md:mt-8  mt-4
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
          gap-2 gap-y-10 sm:grid-cols-2  md:grid-cols-3 md:gap-x-4 lg:grid-cols-4
          
          "
      >
        {children}
      </div>
    </div>
  );
};
