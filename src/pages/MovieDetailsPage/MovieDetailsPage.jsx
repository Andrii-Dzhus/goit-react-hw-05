import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
} from "../../TMDS";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        const movieCast = await fetchMovieCast(movieId);
        const movieReviews = await fetchMovieReviews(movieId);

        setMovie(movieDetails);
        setCast(movieCast);
        setReviews(movieReviews);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>
          <Link to={location.state?.from || "/movies"}>Go back</Link>
          <MovieCast cast={cast} />
          <MovieReviews reviews={reviews} />
        </div>
      )}
    </div>
  );
}
