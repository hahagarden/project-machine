import styled from "styled-components";
import Table from "./Table";
import RegisterModal from "./RegisterModal";
import { registerModalOnAtom } from "./atoms_mylikes";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #82ccdd;
`;

const Menu = styled.div``;

const Button = styled.button``;

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
          <Button>Ranking</Button>
          <Button>Genre</Button>
        </Menu>
        <Table />
      </Wrapper>
    </>
  );
}

export default Song;
