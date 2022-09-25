import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div``;

const SongList = styled.ul``;

const Songs = styled.li``;

function Song() {
  return (
    <Container>
      <Header></Header>
      <SongList>
        <Songs>Hi</Songs>
        <Songs>Hello song</Songs>
      </SongList>
    </Container>
  );
}

export default Song;
