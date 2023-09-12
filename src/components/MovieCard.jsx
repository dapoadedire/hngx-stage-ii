import { Link } from "react-router-dom";
import {FaRegHeart} from 'react-icons/fa'
import { Toaster, toast } from 'sonner'

export const MovieCard = ({ movie }) => {
  return (
   <>
   
   <div
      key={movie.id}
      data-testid="movie-card"
      className=" relative flex w-[250px] flex-col justify-center gap-4"
    >
      <div
      className="absolute right-1 top-1 p-2 bg-red-100 rounded-full cursor-pointer
    bg-opacity-50 border border-red-500 hover:bg-opacity-100
      "
      >
        <FaRegHeart className="h-5 w-5 text-red-500
       
        " 
        onClick={() => toast.success(
          `Added ${movie.title} to your favorites`,
        )}
        
        />
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        data-testid="movie-poster"
      />
      <div>
        <Link to={`/movies/${movie.id}`}>
          <h2 data-testid="movie-title" className="mb-2 text-lg font-bold">
            {movie.title}
          </h2>
        </Link>
        <p data-testid="movie-release-date">{movie.release_date}</p>
      </div>
    </div>
   </>
  );
};
