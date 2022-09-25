import styled from "styled-components";
import { Link, Routes, Route } from "react-router-dom";
import AddList from "./AddList";

const Container = styled.div``;

const Header = styled.div``;

const SongList = styled.ul``;

const Songs = styled.li``;

const AddButton = styled.button``;

class List {
  constructor(
    public songs: {
      [title: string]: {
        title: string;
        singer: string;
        genre: string;
        memo: string;
      };
    }
  ) {
    this.songs = {};
  }

  add(what: Element) {
    if (this.songs[what.title] === undefined) this.songs[what.title] = what;
  }
}

class Element {
  constructor(
    public title: string,
    public singer: string,
    public genre: string,
    public memo: string
  ) {}
}

function Song() {
  return (
    <>
      <Container>
        <Header></Header>
        <AddButton>
          <Link to="/category/song/add">Add</Link>
        </AddButton>
        <SongList>
          <Songs>Hi</Songs>
          <Songs>Hello song</Songs>
        </SongList>
      </Container>
      <Routes>
        <Route path="/add" element={<AddList />} />
      </Routes>
    </>
  );
}

export default Song;
