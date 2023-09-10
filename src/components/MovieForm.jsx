import { useFetchMovieByTitle } from "../hooks/useFetchMovieByTitle";
import { useState } from "react";

export const MovieForm = () => {
    const [movieTitle, setMovieTitle] = useState(null);

    const { data, isLoading, isError, error } = useFetchMovieByTitle(movieTitle);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMovieTitle(e.target.value);
    }

    return (
        <div className="">
            <form className="" onSubmit={handleSubmit}>
                <label className="" htmlFor="movieTitle">
                    Movie Title
                </label>
                <input
                    className="border border-gray-400"
                    type="text"
                    id="movieTitle"
                    name="movieTitle"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value)}
                />

                <button className="" type="submit">
                    Search
                </button>
            </form>
            <div className="">
                {data.results.map((movie) => (
                    <div className="" key={movie.id}>
                        <img
                            className=""
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="">
                            <p className="">{movie.id}</p>
                            <h2 className="">{movie.title}</h2>
                            <p className="">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}