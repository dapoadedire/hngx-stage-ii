import { Link } from "react-router-dom";
import { useFetchMovies } from "../hooks/useFetchMovies";

export const Home = () => {
   
  const { data, isLoading, isError, error } = useFetchMovies();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div
    className="grid grid-cols-1 gap-4 sm:grid-cols-2  md:grid-cols-3"
    >
      {data.results.slice(0, 10).map((movie) => (
        <div key={movie.id} data-testid="movie-card"
        className=""
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            data-testid="movie-poster"
          />
          <div>
            <h2 data-testid="movie-title">{movie.title}</h2>
            <p data-testid="movie-release-date">{movie.release_date}</p>
            <Link to={`/movies/${movie.id}`}>View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

