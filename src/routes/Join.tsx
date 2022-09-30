import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Join() {
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
