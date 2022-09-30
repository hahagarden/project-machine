import { useForm } from "react-hook-form";
import { Routes, Route, Link } from "react-router-dom";
import Join from "./Join";

function Login() {
  const { register } = useForm();

  return (
    <>
      <form
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
