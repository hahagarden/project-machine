import { ISong, songsAtom, updateModalOnAtom } from "./atoms_mylikes";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

interface IUpdateModalProps {
  song: ISong;
}

const ModalWindow = styled.div<{ updateOn: boolean }>`
  background-color: pink;
  border: 1px solid;
  display: ${(props) => (props.updateOn ? "flex" : "none")};
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

function UpdateModal({ song }: IUpdateModalProps) {
  console.log(song, "is rendered");
  const [songs, setSongs] = useRecoilState(songsAtom);
  const [updateOn, setUpdateOn] = useRecoilState(updateModalOnAtom);
  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      title: song.title,
      singer: song.singer,
      genre: song.genre,
    },
  });
  const onSubmit = (data: IForm) => {
    if (
      song.title == data.title &&
      song.singer == data.singer &&
      song.genre == data.genre
    ) {
      alert("there is no change.");
      return;
    } else if (window.confirm("are you sure updating data?")) {
      const targetIndex = songs.findIndex((what) => what.rank == song.rank);
      setSongs((prevSongs) => {
        const copySongs = [...prevSongs];
        copySongs.splice(targetIndex, 1);
        return [
          {
            rank: song.rank,
            title: data.title,
            singer: data.singer,
            genre: data.genre,
          },
          ...copySongs,
        ];
      });
      console.log(data);
    }
  };
  const modalClose = () => {
    setUpdateOn((current) => !current);
  };
  return (
    <ModalWindow updateOn={updateOn}>
      <Header>
        <Title>Update</Title>
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

          <button>UPDATE</button>
        </Form>
      </Container>
    </ModalWindow>
  );
}

export default UpdateModal;
