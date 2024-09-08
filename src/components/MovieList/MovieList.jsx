import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
