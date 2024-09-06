import Navigation from "../Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";

export default function App() {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
