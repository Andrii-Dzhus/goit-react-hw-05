import { useOutletContext } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { cast } = useOutletContext();

  return (
    <div>
<<<<<<< HEAD
=======

>>>>>>> 275db0dd0aee92f31edf48b209116845043182d1
      <ul className={css.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={css.castItem}>
            <img
              className={css.actorPhoto}
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
