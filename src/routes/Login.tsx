import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { joinedUserAtom, loggedInUserAtom } from "../atom";
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
  position: relative;
  margin: 10px 0;
`;

const Label = styled.label`
  color: white;
  padding-right: 10px;
  font-size: 20px;
`;

const Input = styled.input`
width: 250px;
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

const Span = styled.span`
  position: absolute;
  left: 353px;
  top: 9px;
  width: 250px;
  margin-left: 10px;
  color: red;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 17px;
  width: 300px;
  height: 35px;
  color: white;
  font-size: 20px;
  margin: 20px;
  transition: background-color, color 0.3s;
  &:hover {
    background-color: #f1f2f6;
    color: navy;
  }
`;
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
            autoComplete="off"
          ></Input>
          <Span>{errors?.username?.message}</Span>
        </InputLine>
        <InputLine>
          <Label htmlFor="pw">password</Label>
          <Input
            {...register("pw", {
              required: true,
              minLength: { value: 4, message: "minimum length is 4" },
              maxLength: { value: 10, message: "maximum length is 10" },
            })}
            id="pw"
            placeholder="password"
            autoComplete="off"
          ></Input>
          <Span>{errors?.pw?.message}</Span>
        </InputLine>
        <Button>Log in</Button>
      </Form>
    </Wrapper>
  );
}

export default Login;
