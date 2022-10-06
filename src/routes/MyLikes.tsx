import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Song from "./components_mylikes/Song";
import Movie from "./components_mylikes/Movie";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  background-color: navy;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 10px;
  color: white;
`;

const Menu = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: transparent;
  width: 80px;
  height: 40px;
  margin: 0 20px;
  border: none;
  font-size: 20px;
  a {
    color: white;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 40px;
    text-decoration: underline;
  }
`;

function MyLikes() {
  return (
    <>
      <Wrapper>
        <Header>
          <Title>My Likes</Title>
          <Menu>
            <Button>
              <Link to="/mylikes/song">Song </Link>
            </Button>
            <Button>
              <Link to="/mylikes/movie">Movie</Link>
            </Button>
          </Menu>
        </Header>
        <Routes>
          <Route path="/song/*" element={<Song />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>{" "}
      </Wrapper>
    </>
  );
}

export default MyLikes;
