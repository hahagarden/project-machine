import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../atom";
import Login from "./Login";
import Join from "./Join";
import MyLikes from "./MyLikes";

const Header = styled.div``;

const Title = styled.h1``;

const Container = styled.div``;

const Toy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 100px;
  height: 30px;
  a {
    display: block;
    padding: 5px 20px;
  }
`;

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
        <Toy>
          <Link to="/mylikes">My Likes</Link>
        </Toy>
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
        <Route path="/mylikes/*" element={<MyLikes />} />
      </Routes>
    </>
  );
}

export default Home;
