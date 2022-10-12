import styled from "styled-components";
import Table from "./Table";
import RegisterModal from "./RegisterModal";
import { registerModalOnAtom } from "./atoms_mylikes";
import { useRecoilState } from "recoil";
import { Routes, Route, Link } from "react-router-dom";
import Genre from "./Genre";
import { User } from "firebase/auth";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { dbService } from "../../fbase";
import { useEffect, useState } from "react";

interface SongProps {
  loggedInUser: User | null;
}

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.div``;

const Button = styled.button`
  font-size: 18px;
  font-weight: 500;
  background-color: transparent;
  text-decoration: underline;
  padding: 10px 30px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;

  transition: 0.2s;
  a {
    transition: 0.2s;
    font-weight: 600;
  }
  &:hover {
    color: #ff0063;
    a {
      color: #ff0063;
    }
  }
`;

export interface InterfaceSong {
  createdAt: number;
  creatorId: string;
  genre: string;
  rank: number;
  singer: string;
  title: string;
}

function Song({ loggedInUser }: SongProps) {
  const [modalOn, setModalOn] = useRecoilState(registerModalOnAtom);
  const [songs, setSongs] = useState<InterfaceSong[]>([]);
  const modalOpen = () => {
    setModalOn(true);
  };
  useEffect(() => {
    const q = query(
      collection(dbService, "songs"),
      where("creatorId", "==", loggedInUser?.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const songsDB = [] as InterfaceSong[];
      querySnapshot.forEach((doc) => {
        songsDB.push(doc.data() as InterfaceSong);
      });
      setSongs(songsDB);
    });
  }, []);
  console.log(songs);

  return (
    <>
      <Wrapper>
        <Menu>
          <Button onClick={modalOpen}>Register</Button>
          {modalOn && (
            <RegisterModal loggedInUser={loggedInUser} songs={songs} />
          )}
          <Button>
            <Link to="/mylikes/song/table">Ranking Table</Link>
          </Button>
          <Button>
            <Link to="/mylikes/song/genre">Genre Board</Link>
          </Button>
        </Menu>
      </Wrapper>

      <Routes>
        <Route path="/table" element={<Table />} />
        <Route path="/genre" element={<Genre />} />
      </Routes>
    </>
  );
}

export default Song;
