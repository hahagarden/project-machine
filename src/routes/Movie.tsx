import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div``;

const MovieList = styled.ul``;

const Movies = styled.li``;

function Movie() {
  return (
    <Container>
      <Header></Header>
      <MovieList>
        <Movies>Hi</Movies>
        <Movies>Hello</Movies>
      </MovieList>
    </Container>
  );
}

export default Movie;
