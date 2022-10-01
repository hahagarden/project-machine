import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Join from "./Join";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../atom";

const Header = styled.div``;

const Title = styled.h1``;

const Container = styled.div``;

function Home() {
  const nowUser = useRecoilValue(loggedInUserAtom);
  const isLoggedIn = nowUser.username !== "";
  return (
    <>
      <Header>
        <Title>
          {isLoggedIn ? `${nowUser.username}'s` : null} Project Machine
        </Title>
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
