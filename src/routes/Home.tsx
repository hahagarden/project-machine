import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Join from "./Join";

const Header = styled.div``;

const Title = styled.h1``;

const Container = styled.div``;

function Home() {
  return (
    <>
      <Header>
        <Title>Project Machine</Title>
      </Header>
      <Container>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/join">
          <button>Join</button>
        </Link>
      </Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
}

export default Home;
