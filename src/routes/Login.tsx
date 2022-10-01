import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { joinedUserAtom, loggedInUserAtom } from "../atom";

interface ILoginForm {
  username: string;
  pw: string;
}
function Login() {
  const navigate = useNavigate();
  const joinedUser = useRecoilValue(joinedUserAtom);
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit = (data: ILoginForm) => {
    const targetIndex = joinedUser.findIndex(
      (user) => user.username === data.username
    );
    if (targetIndex == -1)
      setError("username", { message: "username does not exist." });
    else if (joinedUser[targetIndex].password !== data.pw)
      setError("pw", { message: "password does not correct." });
    else {
      setLoggedInUser(joinedUser[targetIndex]);
      alert(`Hello ${data.username}!`);
      navigate("/");
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
