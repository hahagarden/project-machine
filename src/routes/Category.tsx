import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = styled.div``;
const Title = styled.h1``;
const Button = styled.button``;

interface ILocation {
  username: string;
}

function Category() {
  const location = useLocation();
  const state = location.state as ILocation;
  return (
    <>
      <Header>
        <Title>Hello, {state.username} !</Title>
      </Header>
      <Link to="/category/song">
        <Button>Song</Button>
      </Link>

      <Link to="/category/movie">
        <Button>Movie</Button>
      </Link>
    </>
  );
}

export default Category;
