import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails";
import { useParams } from "react-router-dom";

export const Movie = () => {
    const { movieId } = useParams();
    const { data, isLoading, isError, error } = useFetchMovieDetails(movieId);
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
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
            />
            <div className="">
                <h2 className=""
                data-testid="movie-title"
                >{data.title}</h2>
                <p className=""
                data-testid="movie-overview"
                >{data.overview}</p>
                <p className=""
                data-testid="movie-release-date"
                >{data.release_date}</p>
                <p className=""
                data-testid="movie-runtime"
                >{data.runtime}</p>
            </div>
        </div>
    );
}
