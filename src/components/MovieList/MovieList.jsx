import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  if (!movies || !Array.isArray(movies)) {
    return <p>No movies available</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: window.location.pathname }}
            >
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
