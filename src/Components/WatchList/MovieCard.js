import React from "react";
import { MovieControls } from "./Control";

const style = {
  moviecard: {
    width: "100%",
    borderRadius:"5px",
    overflow: "hidden",
    position: "relative",
    border: 0,
    display: "block",
  }
}

export const MovieCard = ({ movie, type }) => {
  return (
    <div className="movie-card" style={style.moviecard}>
      <div className="overlay"></div>

      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} Poster`}
      />

      <MovieControls type={type} movie={movie} />
    </div>
  );
};