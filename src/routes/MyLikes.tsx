import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Song from "./components_mylikes/Song";
import Movie from "./components_mylikes/Movie";

const Button = styled.button``;

function MyLikes() {
  return (
    <>
      <div>
        <h1>My Likes</h1>
        <hr />
        <Link to="/mylikes/song">
          <Button>Song</Button>
        </Link>
        <Link to="/mylikes/movie">
          <Button>Movie</Button>
        </Link>
        <hr />
      </div>
      <Routes>
        <Route path="/song" element={<Song />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </>
  );
}

export default MyLikes;
