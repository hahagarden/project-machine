import styled from "styled-components";
import Table from "./Table";
import RegisterModal from "./RegisterModal";
import { registerModalOnAtom } from "./atoms_mylikes";
import { useRecoilState } from "recoil";

const Button = styled.button``;

function Song() {
  const [modalOn, setModalOn] = useRecoilState(registerModalOnAtom);
  const modalOpen = () => {
    setModalOn(true);
  };
  return (
    <>
      <div>
        <Button onClick={modalOpen}>Register</Button>
        {modalOn && <RegisterModal />}
        <Button>Ranking</Button>
        <Button>Genre</Button>
        <Table />
      </div>
    </>
  );
}

export default Song;
