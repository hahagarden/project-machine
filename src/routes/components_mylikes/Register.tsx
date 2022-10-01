import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { SongsAtom } from "./atoms_mylikes";

interface IForm {
  title: string;
  singer: string;
  genre: string;
}

function Register() {
  const [songs, setSongs] = useRecoilState(SongsAtom);
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">title</label>
          <input id="title" {...register("title", { required: true })}></input>
          <label htmlFor="singer">singer</label>
          <input
            id="singer"
            {...register("singer", { required: true })}
          ></input>
          <span>genre</span>
          <label id="JPOP">
            <input type="radio" id="JPOP" value="JPOP" {...register("genre")} />
            JPOP
          </label>
          <label id="KPOP">
            <input type="radio" id="KPOP" value="KPOP" {...register("genre")} />
            KPOP
          </label>

          <button>Add</button>
        </form>
        <Link to="/mylikes/song">
          <button>X</button>
        </Link>
      </div>
    </>
  );
}

export default Register;
