import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div``;

const SongList = styled.ul``;

const Songs = styled.li``;

function Song() {
  const Param = useParams();
  console.log(Param);
  return (
    <Container>
      <Header></Header>
      <SongList>
        <Songs>Hi</Songs>
        <Songs>Hello</Songs>
      </SongList>
    </Container>
  );
}

export default Song;
