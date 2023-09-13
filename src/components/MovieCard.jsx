import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";
import backdrop from "../assets/images/backdrop.jpg";
import { getGenreName } from "../utils";
export const MovieCard = ({ movie }) => {
  return (
    <>
      <div
        key={movie.id}
        data-testid="movie-card"
        className="  flex w-[165px] flex-col justify-start gap-4 md:w-[250px]"
      >
        <div className="relative">
          <div
                    className="absolute right-1 top-1 cursor-pointer rounded-full border border-red-300
            bg-red-100/50 p-2 hover:bg-red-100/100
              "
          >
            <FaRegHeart
              className="h-5 w-5 text-red-500
       
        "
              onClick={() =>
                toast.success(`Added ${movie.title} to your favorites`)
              }
            />
          </div>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : backdrop
            }
            alt={movie.title}
            data-testid="movie-poster"
            className="w-full"
          />
        </div>
        <div>
          <Link to={`/movies/${movie.id}`}>
          <p
          className="mb-2 text-[13px] text-gray-500"
          data-testid="movie-release-date">{movie.release_date}</p>
      
            <h2 data-testid="movie-title" className="
            mb-2
            text-lg font-medium md:font-bold">
              {movie.title}
            </h2>
          </Link>
         
       <p
       className=""
       >
      {
        movie.genre_ids.map((genre, index) => (
          <span
          key={genre}
          className="mr-2 text-sm text-gray-600"
          >
            {getGenreName(genre)}
            {index !== movie.genre_ids.length - 1 ? ", " : ""}
          </span>
        ))

      }
       </p>
           </div>
      </div>
    </>
  );
};



