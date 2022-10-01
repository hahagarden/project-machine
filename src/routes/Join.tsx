import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { joinedUserAtom } from "../atom";

interface IJoinForm {
  username: string;
  name: string;
  pw: string;
  pwConfirm: string;
}

function Join() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IJoinForm>();
  const setJoinedUser = useSetRecoilState(joinedUserAtom);
  const onSubmit = (data: IJoinForm) => {
    if (data.pwConfirm !== data.pw) {
      setError(
        "pwConfirm",
        { message: "password are not the same." },
        { shouldFocus: true }
      );
    } else {
      setJoinedUser((prevUser) => [
        { username: data.username, name: data.name, password: data.pw },
        ...prevUser,
      ]);
      alert(`welcome ${data.username}!`);
      navigate("/login");
    }
  };
  console.log(errors);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "navy",
        }}
      >
        <div>
          <label htmlFor="username">username</label>
          <input
            {...register("username", {
              required: true,
              pattern: {
                value: /^[a-zA-z0-9]/,
                message: "alphabet and number only",
              },
            })}
            id="username"
            placeholder="username"
          ></input>
        </div>
        <div>
          <label htmlFor="name">name</label>
          <input
            {...register("name", { required: true })}
            id="name"
            placeholder="name"
          ></input>
        </div>
        <div>
          <label htmlFor="pw">password</label>
          <input
            {...register("pw", { required: true, minLength: 4 })}
            id="pw"
            placeholder="password"
          ></input>
        </div>
        <div>
          <label htmlFor="pwConfirm">confirm password</label>
          <input
            {...register("pwConfirm", { required: true, minLength: 4 })}
            id="pwConfirm"
            placeholder="confirm password"
          ></input>
        </div>
        <button>Join</button>
      </form>
    </>
  );
}

export default Join;
