import styled, { keyframes } from "styled-components";
import { registerModalOnAtom, songsAtom } from "./atoms_mylikes";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";

const animation_show = keyframes`
  from{
    opacity:0%;
  }
  to{
    opacity:100%;
  };
`;

const ModalWindow = styled.div<{ registerOn: boolean }>`
  display: ${(props) => (props.registerOn ? "flex" : "none")};
  background-color: white;
  border: 4px solid navy;
  border-radius: 15px;
  width: 500px;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${animation_show} 0.1s ease-out;
`;

const Header = styled.div`
  display: flex;
  margin: 25px;
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
  font-size: 22px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const InputLine = styled.div`
  position: relative;
  left: -10px;
  margin-top: 10px;
  width: 400px;
  display: flex;
  justify-content: center;
`;

const Label = styled.label`
  position: relative;
  top: 7px;
  left: -1px;
  display: inline-block;
  width: 85px;
  height: 40px;
  text-align: right;
  color: black;
  padding-right: 10px;
  font-size: 20px;
`;

const Input = styled.input`
  width:250px;
  height: 35px;
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
  position: absolute;
  left: -50px;
  top: 95px;
  margin-top: 15px;
  width: 400px;
  display: flex;
  justify-content: center;
  label {
    &:nth-child(n+2):nth-child(-n+3) {
      margin-top:3px;
      transform: translateX(-5px);
    }
  }

  }
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
  border-radius: 15px;
  width: 300px;
  height: 35px;
  color: black;
  font-size: 20px;
  margin: 25px;
  margin-top: 80px;
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
        <CloseButton onClick={modalClose}>×</CloseButton>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLine>
            <Label htmlFor="title">title</Label>
            <Input
              id="title"
              placeholder="title"
              autoComplete="off"
              {...register("title", { required: true })}
            ></Input>
          </InputLine>
          <InputLine>
            <Label htmlFor="singer">singer</Label>
            <Input
              id="singer"
              placeholder="singer"
              autoComplete="off"
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
