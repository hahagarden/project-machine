import styled from "styled-components";
import Table from "./Table";
import RegisterModal from "./RegisterModal";
import { registerModalOnAtom } from "./atoms_mylikes";
import { useRecoilState } from "recoil";
import { Routes, Route, Link } from "react-router-dom";
import Genre from "./Genre";

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
  const [modalOn, setModalOn] = useRecoilState(registerModalOnAtom);
  const modalOpen = () => {
    setModalOn(true);
  };
  return (
    <>
      <Wrapper>
        <Menu>
          <Button onClick={modalOpen}>Register</Button>
          {modalOn && <RegisterModal />}
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
