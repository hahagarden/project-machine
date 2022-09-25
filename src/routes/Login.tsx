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
  const location = useLocation();
  const state = location.state;
  console.log(state);
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
            <span>log in</span>
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
