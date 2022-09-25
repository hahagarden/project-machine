import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === "username"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };

  type LocationState = {
    state: {
      users: {
        users: { [key: string]: object };
      };
    };
  };

  interface Iuser {
    name: string;
    username: string;
    password: string;
  }

  const { state } = useLocation() as LocationState;
  const users = state?.users.users || {};
  const user = (users?.[username] as Iuser) || {};

  const isUser = () => {
    if (users[username] === undefined) return false;
    else return true;
  };
  const correctPassword = () => {
    if (password === user.password) return true;
    else return false;
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={onChange}
          />
          <Link to="/category" state={{ username: username }}>
            <button disabled={isUser() && correctPassword() ? false : true}>
              log in
            </button>
          </Link>
        </div>
        <Link to="/join">
          <span>join</span>
        </Link>
      </form>
    </>
  );
}

export default Login;
