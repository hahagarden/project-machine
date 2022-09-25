import { Component, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type UsersType = {
  [username: string]: object;
};

class Users {
  public users: UsersType;
  constructor() {
    this.users = {};
  }
  add(newUser: User) {
    if (this.users[newUser.username] === undefined)
      this.users[newUser.username] = newUser;
  }
  showAll() {
    console.log(this.users);
  }
}

class User {
  constructor(
    public name: string,
    public username: string,
    public password: string
  ) {}
}

const InputBox = styled.input.attrs({ required: true })``;

const users = new Users();

function Join() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === "name"
      ? setName(event.target.value)
      : event.target.id === "username"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = new User(name, username, password);
    users.add(newUser);
    setSubmitted(true);
  };
  return (
    <>
      <h1>Join</h1>
      <form onSubmit={onSubmit}>
        <InputBox
          id="name"
          placeholder="name"
          value={name}
          onChange={onChange}
        ></InputBox>
        <InputBox
          id="username"
          placeholder="username"
          value={username}
          onChange={onChange}
        ></InputBox>
        <InputBox
          id="password"
          placeholder="password"
          value={password}
          onChange={onChange}
        ></InputBox>
        <button>Join</button>
      </form>
      <Link to="/" state={{ users: users }}>
        <button disabled={submitted ? false : true}>Join complete</button>
      </Link>
    </>
  );
}

export default Join;
