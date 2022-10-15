import styled from "styled-components";
import Table from "./Table";
import RegisterModal from "./RegisterModal";
import { registerModalOnAtom, songsFireAtom } from "./atoms_mylikes";
import { useRecoilState } from "recoil";
import { Routes, Route, Link } from "react-router-dom";
import Genre from "./Genre";
import { onSnapshot, query, collection, where, doc } from "firebase/firestore";
import { dbService } from "../../fbase";
import { useEffect } from "react";
import { InterfaceSong } from "./atoms_mylikes";
import { rankingFireAtom } from "./atoms_mylikes";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../../atom";

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

function Song() {
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const [modalOn, setModalOn] = useRecoilState(registerModalOnAtom);
  const [songs, setSongs] = useRecoilState(songsFireAtom);
  const [ranking, setRanking] = useRecoilState(rankingFireAtom);
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
        songsDB.push({ ...(doc.data() as InterfaceSong) });
      });
      setSongs(songsDB);
    });
    console.log("useEffect&snapshot rendered.");
  }, []);
  useEffect(() => {
    onSnapshot(
      doc(dbService, "songs", `ranking_${loggedInUser?.uid}`),
      (doc) => {
        setRanking({ ...doc.data() });
      }
    );
  }, []);
  useEffect(() => {
    const orderedSongs = songs.slice();
    orderedSongs.sort((a, b) => ranking[a.id] - ranking[b.id]);
    setSongs(orderedSongs);
  }, [ranking]);
  return (
    <>
      <Wrapper>
        <Menu>
          <Button onClick={modalOpen}>Register</Button>
          {modalOn && <RegisterModal songs={songs} />}
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
