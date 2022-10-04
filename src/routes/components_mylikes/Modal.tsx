import styled from "styled-components";
import { modalOnAtom } from "./atoms_mylikes";
import Register from "./Register";
import { useRecoilState } from "recoil";

const ModalWindow = styled.div<{ modalOn: boolean }>`
  background-color: yellow;
  border: 1px solid;
  display: ${(props) => (props.modalOn ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Header = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const Container = styled.div``;

function Modal() {
  const [modalOn, setModalOn] = useRecoilState(modalOnAtom);
  const modalClose = () => {
    setModalOn(false);
  };
  return (
    <ModalWindow modalOn={modalOn}>
      <Header>
        <Title>Register</Title>
        <button onClick={modalClose}>X</button>
      </Header>
      <Container>
        <Register />
      </Container>
    </ModalWindow>
  );
}

export default Modal;
