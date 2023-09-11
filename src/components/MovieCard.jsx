import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <div
      key={movie.id}
      data-testid="movie-card"
      className=" flex w-[250px] flex-col justify-center gap-4 "
    >
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
  );
};
