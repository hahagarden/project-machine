import styled from "styled-components";
import { registerModalOnAtom, songsAtom } from "./atoms_mylikes";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";

const ModalWindow = styled.div<{ registerOn: boolean }>`
  display: ${(props) => (props.registerOn ? "flex" : "none")};
  background-color: white;
  border: 3px solid navy;
  width: 500px;
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
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

interface IForm {
  title: string;
  singer: string;
  genre: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const InputLine = styled.div`
  margin-top: 10px;
  width: 400px;
`;

const Label = styled.label`
  display: inline-block;
  width: 90px;
  text-align: right;
  color: black;
  padding-right: 10px;
  font-size: 20px;
`;

const Input = styled.input`
  height: 30px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  background-color: inherit;
  color: black;
  font-size: 20px;
  transition: border-bottom 0.3s;
  &:focus {
    border-bottom: 1px solid black;
    }
  }
`;

const GenreInputLine = styled.div`
  margin-top: 15px;
  width: 400px;
`;

const GenreInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  background-color: inherit;
  color: black;
  font-size: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  width: 350px;
  height: 30px;
  color: black;
  font-size: 20px;
  margin: 25px;
  cursor: pointer;
  transition: background-color, color 0.3s;
  &:hover {
    background-color: navy;
    color: white;
  }
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
        <CloseButton onClick={modalClose}>X</CloseButton>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLine>
            <Label htmlFor="title">title</Label>
            <Input
              id="title"
              placeholder="title"
              {...register("title", { required: true })}
            ></Input>
          </InputLine>
          <InputLine>
            <Label htmlFor="singer">singer</Label>
            <Input
              id="singer"
              placeholder="singer"
              {...register("singer", { required: true })}
            ></Input>
          </InputLine>

          <GenreInputLine>
            <Label>genre</Label>
            <Label id="JPOP">
              <GenreInput
                type="radio"
                id="JPOP"
                value="JPOP"
                {...register("genre", { required: true })}
              />
              JPOP
            </Label>
            <Label id="KPOP">
              <GenreInput
                type="radio"
                id="KPOP"
                value="KPOP"
                {...register("genre", { required: true })}
              />
              KPOP
            </Label>
          </GenreInputLine>

          <Button>Add</Button>
        </Form>
      </Container>
    </ModalWindow>
  );
}

export default Modal;
