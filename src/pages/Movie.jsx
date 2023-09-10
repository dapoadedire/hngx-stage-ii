// {
//     "adult": false,
//     "backdrop_path": "/pbrkL804c8yAv3zBZR4QPEafpAR.jpg",
//     "belongs_to_collection": null,
//     "budget": 165000000,
//     "genres": [
//         {
//             "id": 12,
//             "name": "Adventure"
//         },
//         {
//             "id": 18,
//             "name": "Drama"
//         },
//         {
//             "id": 878,
//             "name": "Science Fiction"
//         }
//     ],
//     "homepage": "http://www.interstellarmovie.net/",
//     "id": 157336,
//     "imdb_id": "tt0816692",
//     "original_language": "en",
//     "original_title": "Interstellar",
//     "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
//     "popularity": 146.633,
//     "poster_path": "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
//     "production_companies": [
//         {
//             "id": 923,
//             "logo_path": "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
//             "name": "Legendary Pictures",
//             "origin_country": "US"
//         },
//         {
//             "id": 9996,
//             "logo_path": "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
//             "name": "Syncopy",
//             "origin_country": "GB"
//         },
//         {
//             "id": 13769,
//             "logo_path": null,
//             "name": "Lynda Obst Productions",
//             "origin_country": ""
//         }
//     ],
//     "production_countries": [
//         {
//             "iso_3166_1": "GB",
//             "name": "United Kingdom"
//         },
//         {
//             "iso_3166_1": "US",
//             "name": "United States of America"
//         }
//     ],
//     "release_date": "2014-11-05",
//     "revenue": 701729206,
//     "runtime": 169,
//     "spoken_languages": [
//         {
//             "english_name": "English",
//             "iso_639_1": "en",
//             "name": "English"
//         }
//     ],
//     "status": "Released",
//     "tagline": "Mankind was born on Earth. It was never meant to die here.",
//     "title": "Interstellar",
//     "video": false,
//     "vote_average": 8.4,
//     "vote_count": 32429
// }



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
        // - title - [data-testid: movie-title]
        // - release date (in UTC) - [data-testid: movie-release-date]
        // - runtime (in minutes) - [data-testid: movie-runtime]
        // - overview - [data-testid: movie-overview]
    
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
