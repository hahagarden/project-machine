import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../atom";
import Login from "./Login";
import Join from "./Join";
import MyLikes from "./MyLikes";
import Toys from "./Toys";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b2bec3;
  width: 100%;
`;

const Title = styled.div`
  width: 350px;
  background-color: #1e90ff;
  box-shadow: 0 0 25px 5px white, inset 0 0 15px 0px rgba(0, 0, 0, 0.3);
  border-radius: 100px;
  margin: 20px;
  padding: 60px;
  color: white;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
`;

const Menu = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #ff9f29;
  box-shadow: 0 0 10px 3px white, inset 0 0 5px 0px rgba(0, 0, 0, 0.3);
  width: 100px;
  height: 45px;
  margin: 0 10px;
  border-radius: 20px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  a {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 45px;
    color: white;
  }
  transition: a 0.3s;
  &:hover {
    box-shadow: 0 0 15px 7px white, inset 0 0 5px 0px rgba(0, 0, 0, 0.3);
    a {
      color: #ff0063;
    }
  }
`;

const Container = styled.div`
  margin-top: 335px;
  width: 100vw;
`;

function Home() {
  const nowUser = useRecoilValue(loggedInUserAtom);
  const isLoggedIn = nowUser.username !== "";
  return (
    <Wrapper>
      <Header>
        <Title>
          {isLoggedIn ? `${nowUser.username}'s` : null} Project Machine
        </Title>
        <Menu>
          <Button>
            <Link to="/">Home</Link>
          </Button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
          <Button>
            <Link to="/join">Join </Link>
          </Button>
        </Menu>
      </Header>
      <Container>
        <Routes>
          <Route path="/" element={<Toys />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mylikes/*" element={<MyLikes />} />
        </Routes>
      </Container>
    </Wrapper>
  );
}

export default Home;
