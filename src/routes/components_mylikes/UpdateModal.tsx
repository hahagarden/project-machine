import {
  InterfaceLike,
  likesFireAtom,
  updateModalOnAtom,
  songGenres,
} from "./atoms_mylikes";
import styled, { keyframes } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

const animation_show = keyframes`
    from{
      opacity:0%;
    }
    to{
      opacity:100%;
    };
  `;
interface IUpdateModalProps {
  like: InterfaceLike;
  rank: number;
}

const ModalWindow = styled.div<{ updateOn: boolean }>`
  display: ${(props) => (props.updateOn ? "flex" : "none")};
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

interface IForm {
  title: string;
  singer: string;
  genre: string;
}

function UpdateModal({ like, rank }: IUpdateModalProps) {
  const songs = useRecoilValue(likesFireAtom);
  const ranking = useRecoilValue(likesFireAtom);
  const [updateOn, setUpdateOn] = useRecoilState(updateModalOnAtom);
  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      title: like.title,
      singer: like.singer,
      genre: like.genre,
    },
  });
  const onSubmit = async (data: IForm) => {
    if (
      like.title == data.title &&
      like.singer == data.singer &&
      like.genre == data.genre
    ) {
      alert("there is no change.");
      return;
    } else if (window.confirm("are you sure updating data?")) {
      const updatingSong = doc(dbService, "songs", like.id);
      await updateDoc(updatingSong, {
        title: data.title,
        singer: data.singer,
        genre: data.genre,
        updatedAt: Date.now(),
      });
      alert("updated.");
    }
  };
  const modalClose = () => {
    setUpdateOn((current) => {
      const copyCurrent = [...current];
      const currentIndex = copyCurrent.indexOf(true);
      copyCurrent.splice(currentIndex, 1, false);
      return copyCurrent;
    });
  };
  return (
    <ModalWindow updateOn={updateOn[rank]}>
      <Header>
        <Title>Update</Title>
        <CloseButton onClick={modalClose}>×</CloseButton>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLine>
            <Label htmlFor="title">title</Label>
            <Input
              id="title"
              autoComplete="off"
              {...register("title", { required: true })}
            ></Input>
          </InputLine>
          <InputLine>
            <Label htmlFor="singer">singer</Label>
            <Input
              id="singer"
              autoComplete="off"
              {...register("singer", { required: true })}
            ></Input>
          </InputLine>
          <GenreInputLine>
            <Label>genre</Label>
            {Object.values(songGenres).map((genre) => (
              <Label key={genre} id={genre}>
                <GenreInput
                  type="radio"
                  id={genre}
                  value={genre}
                  {...register("genre", { required: true })}
                />
                {genre}
              </Label>
            ))}
          </GenreInputLine>

          <Button>Modify</Button>
        </Form>
      </Container>
    </ModalWindow>
  );
}

export default UpdateModal;
