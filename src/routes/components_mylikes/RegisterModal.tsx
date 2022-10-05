import styled from "styled-components";
import { registerModalOnAtom, songsAtom } from "./atoms_mylikes";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";

const ModalWindow = styled.div<{ registerOn: boolean }>`
  background-color: yellow;
  border: 1px solid;
  display: ${(props) => (props.registerOn ? "flex" : "none")};
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

interface IForm {
  title: string;
  singer: string;
  genre: string;
}

const Form = styled.form`
  display: "flex";
  flex-direction: "column";
`;

function Modal() {
  const setSongs = useSetRecoilState(songsAtom);
  const [registerOn, setRegisterOn] = useRecoilState(registerModalOnAtom);
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    setSongs((prevSongs) => {
      const newSongs = [
        {
          id: Date.now() + "",
          rank: prevSongs.length + 1,
          title: data.title,
          singer: data.singer,
          genre: data.genre,
        },
        ...prevSongs,
      ];
      newSongs.sort((a, b) => Number(a.rank) - Number(b.rank));
      return newSongs;
    });
  };
  const modalClose = () => {
    setRegisterOn(false);
  };

  return (
    <ModalWindow registerOn={registerOn}>
      <Header>
        <Title>Register</Title>
        <button onClick={modalClose}>X</button>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">title</label>
            <input
              id="title"
              {...register("title", { required: true })}
            ></input>
          </div>
          <div>
            <label htmlFor="singer">singer</label>
            <input
              id="singer"
              {...register("singer", { required: true })}
            ></input>
          </div>
          <span>genre</span>
          <div>
            <label id="JPOP">
              <input
                type="radio"
                id="JPOP"
                value="JPOP"
                {...register("genre", { required: true })}
              />
              JPOP
            </label>
            <label id="KPOP">
              <input
                type="radio"
                id="KPOP"
                value="KPOP"
                {...register("genre", { required: true })}
              />
              KPOP
            </label>
          </div>

          <button>Add</button>
        </Form>
      </Container>
    </ModalWindow>
  );
}

export default Modal;
