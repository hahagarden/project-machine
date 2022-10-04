import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { songsAtom } from "./atoms_mylikes";

interface IForm {
  title: string;
  singer: string;
  genre: string;
}

const Form = styled.form`
  display: "flex";
  flex-direction: "column";
`;

function Register() {
  const [songs, setSongs] = useRecoilState(songsAtom);
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    setSongs((prevSongs) => [
      {
        rank: prevSongs.length + 1,
        title: data.title,
        singer: data.singer,
        genre: data.genre,
      },
      ...prevSongs,
    ]);
    console.log(data);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" {...register("title", { required: true })}></input>
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
    </>
  );
}

export default Register;
