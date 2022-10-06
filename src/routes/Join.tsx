import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { joinedUserAtom } from "../atom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  background-color: navy;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const InputLine = styled.div`
  margin-top: 10px;
`;

const Label = styled.label`
  display: inline-block;
  width: 165px;
  text-align: right;
  color: white;
  padding-right: 10px;
  font-size: 20px;
`;

const Input = styled.input`
  height: 30px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  background-color: inherit;
  color: white;
  font-size: 20px;
  transition: border-bottom 0.3s;
  &:focus {
    color:#fff200;
    border-bottom: 1px solid white;
    }
  }
`;
const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  width: 350px;
  height: 30px;
  color: white;
  font-size: 20px;
  margin: 20px;
  transition: background-color, color 0.3s;
  &:hover {
    background-color: #f1f2f6;
    color: navy;
  }
`;
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
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputLine>
          <Label htmlFor="username">username</Label>
          <Input
            {...register("username", {
              required: true,
              pattern: {
                value: /^[a-zA-z0-9]/,
                message: "alphabet and number only",
              },
            })}
            id="username"
            placeholder="username"
          ></Input>
        </InputLine>
        <InputLine>
          <Label htmlFor="name">name</Label>
          <Input
            {...register("name", { required: true })}
            id="name"
            placeholder="name"
          ></Input>
        </InputLine>
        <InputLine>
          <Label htmlFor="pw">password</Label>
          <Input
            {...register("pw", { required: true, minLength: 4 })}
            id="pw"
            placeholder="password"
          ></Input>
        </InputLine>
        <InputLine>
          <Label htmlFor="pwConfirm">confirm password</Label>
          <Input
            {...register("pwConfirm", { required: true, minLength: 4 })}
            id="pwConfirm"
            placeholder="confirm password"
          ></Input>
        </InputLine>
        <Button>Join</Button>
      </Form>
    </Wrapper>
  );
}

export default Join;
