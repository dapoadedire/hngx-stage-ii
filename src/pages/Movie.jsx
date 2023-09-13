/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails";
import { useParams } from "react-router-dom";
import backdrop from "../assets/images/backdrop.jpg";
import tv from "../assets/images/tv.svg";
import home from "../assets/images/home.svg";
import calendar from "../assets/images/calendar.svg";
import movies from "../assets/images/movies.svg";
import logout from "../assets/images/logout.svg";
import tvShow from "../assets/images/tv-show.svg";
import { Link } from "react-router-dom";
import menu from "../assets/images/menu.svg";
import { useState } from "react";
import { Loading } from "../components/Loading";

const sidebar_items = [
  {
    title: "Home",
    url: "/",
    icon: home,
  },
  {
    title: "Movies",
    url: "/",
    icon: movies,
    active: true,
  },
  {
    title: "TV Shows",
    url: "/",
    icon: tvShow,
  },
  {
    title: "Calendar",
    url: "/",
    icon: calendar,
  },
];

export const Movie = () => {
    const [navActive, setNavActive] = useState(false);

  const { movieId } = useParams();
  const { movie, isLoading, isError, error } = useFetchMovieDetails(movieId);
 
  return (
    <div className="relative flex flex-col md:flex-row">
      <div
        id="sidebar"
        className="
        sticky left-0 top-0 hidden h-screen
        w-full max-w-[250px] flex-col  justify-between
        gap-3 rounded-r-[4rem] border  border-gray-300  bg-gray-100 md:flex md:w-4/6 lg:w-2/6 xl:w-1/6
            "
      >
          <Link to="/">
        <div
          className="my-8  flex 
        space-x-2 p-4"
        >
          <img src={tv} alt="tv" className="w-7" />

          <span
            className=" font-bold
        md:text-xl
       "
          >
            MovieBox
          </span>
        </div>
        </Link>

        <div className="my-8 flex  w-full 
        
        flex-col gap-4">
          {sidebar_items.map((item, index) => (
            <div
              key={index}
              className={`
                    flex  w-full cursor-pointer  gap-4  p-4
                     hover:bg-gray-200
                    ${item.active && "border-r-4 border-[#BE123C] bg-[#f5acbe]"}
                    `}
            >
              <img src={item.icon} alt={item.title} className="w-6" />
              <Link to={item.url}>
                <span className="text-base font-medium">{item.title}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="m-4 flex flex-col gap-2 rounded-xl border border-[#be123d54] bg-[#F8E7EB] p-4">
          <p className="text-base font-medium">
            Play movie quizes and earn free tickets.
          </p>
          <p className="text-sm font-medium">50K people are playing now.</p>
          <button className="rounded-full border border-[#BE123C] px-4 py-2 font-medium text-[#BE123C]">
            Start Playing
          </button>
        </div>
        <div className="my-8  flex w-full cursor-pointer gap-4 rounded-md  px-4 py-2 hover:bg-gray-200">
          <img src={logout} alt="logout" className="w-6" />
          <span className="text-base font-medium">Logout</span>
        </div>
      </div>

      <div
      className="flex w-full flex-col  justify-between gap-2 border md:hidden"
      >

       <div
       className="flex w-full  items-center justify-between p-2"
       >
      <Link to="/">
      <div
            className="my-2  flex
        items-center space-x-2 "
        >
            <img src={tv} alt="tv" className="w-7" />

            <span
            className=" font-bold
        md:text-xl
         "
            >
            MovieBox
            </span>

            </div>
        
        </Link>

        <button className=""
        onClick={() => setNavActive(!navActive)}
        >
            <img src={menu} alt="menu" className="w-8" />
        </button>
       </div>

        <div className={`flex flex-col gap-4 ${navActive ? "flex" : "hidden"}`}>
            <div className="flex flex-col gap-4">
            {sidebar_items.map((item, index) => (
                <div
                key={index}
                className={`

                    flex  w-full cursor-pointer  gap-4  p-4
                    hover:bg-gray-200
                    ${item.active && "border-r-4 border-[#BE123C] bg-[#f5acbe]"}
                    `}
                >
                <img src={item.icon} alt={item.title} className="w-6" />
                <Link to={item.url}>
                    <span className="text-base font-medium">{item.title}</span>
                </Link>
                </div>

                ))}

                </div>

        </div>

      </div>

     <div
     id="main-content"
     className="mx-auto my-16 flex w-full max-w-[900px] flex-col"
     >

{
        isLoading ? (
          <Loading />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
            <div 
            className="flex flex-col items-center justify-between gap-16 p-4 md:flex-row"
            >
               <img
                 className="
                   w-full md:w-[300px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px]
                 
                 "
                 src={
                   movie.poster_path
                     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                     : backdrop
                 }
                 alt={movie.title}
               />
               <div 
               className="flex flex-col gap-4"
               >
                 <h2 
                 className="text-2xl font-bold"
                 data-testid="movie-title">
                   {movie.title}
                 </h2>
                 <p
                 className="text-base font-medium" 
                 data-testid="movie-overview">
                   {movie.overview}
                 </p>
                 <p 
                 className="text-base font-medium"
                 data-testid="movie-release-date">
                   {movie.release_date}
                 </p>
                 <p 
                 className="text-base font-medium"
                 >
                  <span
                  className="mr-1"
                  data-testid="movie-runtime"
                  >
                  {movie.runtime}
                  </span>
                  minutes.
                 </p>
               </div>
             </div>
        )
      }
    
     </div>
    </div>
  );
};
