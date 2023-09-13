import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";
import backdrop from "../assets/images/backdrop.jpg";

export const MovieCard = ({ movie }) => {
  return (
    <>
      <div
        key={movie.id}
        data-testid="movie-card"
        className="  flex md:w-[250px] flex-col justify-start gap-4 w-[165px]"
      >
        <div className="relative">
          <div
            className="absolute right-1 top-1 p-2 bg-red-100 rounded-full cursor-pointer
    bg-opacity-50 border border-red-500 hover:bg-opacity-100
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
          className="text-[13px] text-gray-500 mb-2"
          data-testid="movie-release-date">{movie.release_date}</p>
      
            <h2 data-testid="movie-title" className="
            font-medium
            mb-2 text-lg md:font-bold">
              {movie.title}
            </h2>
          </Link>
         
        { movie.genres && movie.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index !== movie.genres.length - 1 ? ", " : ""}
                    </span>
                  ))}
           </div>
      </div>
    </>
  );
};
