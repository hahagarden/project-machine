import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { Routes, Route, Link } from "react-router-dom";
import Join from "./Join";
import { joinedUserAtom } from "../atom";

interface ILoginForm {
  username: string;
  pw: string;
}
function Login() {
  const loginUser = useRecoilValue(joinedUserAtom);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit = (data: ILoginForm) => {
    const targetIndex = loginUser.findIndex(
      (user) => user.username === data.username
    );
    if (targetIndex == -1)
      setError("username", { message: "username does not exist." });
    else if (loginUser[targetIndex].password !== data.pw)
      setError("pw", { message: "password does not correct." });
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
          <label htmlFor="pw">password</label>
          <input
            {...register("pw", { required: true, minLength: 4 })}
            id="pw"
            placeholder="password"
          ></input>
        </div>
        <button>log in</button>
      </form>
    </>
  );
}

export default Login;
