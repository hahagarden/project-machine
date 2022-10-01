import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Table from "./Table";

const Button = styled.button``;

function Song() {
  return (
    <>
      <div>
        <Link to="/mylikes/song/register">
          <Button>Register</Button>
        </Link>
        <Button>Ranking</Button>
        <Button>Genre</Button>
        <Table />
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default Song;
