import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails";
import { useParams } from "react-router-dom";
import backdrop from "../assets/images/backdrop.jpg";
export const Movie = () => {
    const { movieId } = useParams();
    const { movie, isLoading, isError, error } = useFetchMovieDetails(movieId);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    return (
     
        <div className="">
            <img
                className=""
                src = {movie.poster_path ? `https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }` : backdrop}
                alt={movie.title}
            />
            <div className="">
                <h2 className=""
                movie-testid="movie-title"
                >{movie.title}</h2>
                <p className=""
                movie-testid="movie-overview"
                >{movie.overview}</p>
                <p className=""
                movie-testid="movie-release-date"
                >{movie.release_date}</p>
                <p className=""
                movie-testid="movie-runtime"
                >{movie.runtime}</p>
            </div>
        </div>
    );
}
