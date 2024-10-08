import { useRef, useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
} from "../../TMDS";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();

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

  const backLinkHref = useRef(location.state?.from ?? "/movies");
  const onClickBack = () => navigate(backLinkHref.current);

  return (
    <div className={css.con}>
      {movie && (
        <div>
          <button onClick={onClickBack}>Go back</button>
          <h1>{movie.title}</h1>
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>

          {movie.genres && movie.genres.length > 0 && (
            <div>
              <h3>Genres:</h3>
              <ul className={css.genresList}>
                {movie.genres.map(genre => (
                  <li key={genre.id} className={css.genreItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Outlet context={{ cast, reviews }} />
        </div>
      )}
    </div>
  );
}
