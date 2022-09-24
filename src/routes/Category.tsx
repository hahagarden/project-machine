import styled from "styled-components";
import { Link } from "react-router-dom";
const Button = styled.button``;

function Category() {
  return (
    <>
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
