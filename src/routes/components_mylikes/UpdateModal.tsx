import {
  ILike,
  updateModalOnAtom,
  myLikesCategoryAtom,
  myLikesTemplateAtom,
} from "./atoms_mylikes";
import styled, { keyframes } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";
import { useEffect } from "react";

const animation_show = keyframes`
    from{
      opacity:0%;
    }
    to{
      opacity:100%;
    };
  `;
interface IUpdateModalProps {
  like: ILike;
  rank: number;
}

const ModalWindow = styled.div<{ updateOn: boolean }>`
  display: ${(props) => (props.updateOn ? "flex" : "none")};
  background-color: white;
  border: 4px solid navy;
  border-radius: 15px;
  width: 500px;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${animation_show} 0.1s ease-out;
`;

const Header = styled.div`
  display: flex;
  margin: 25px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const InputLine = styled.div`
  position: relative;
  left: -10px;
  margin-top: 10px;
  width: 400px;
  display: flex;
  justify-content: center;
`;

const Label = styled.label`
  position: relative;
  top: 7px;
  left: -1px;
  display: inline-block;
  width: 85px;
  height: 40px;
  text-align: right;
  color: black;
  padding-right: 10px;
  font-size: 20px;
`;

const Input = styled.input`
    width:250px;
    height: 35px;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
    background-color: inherit;
    color: black;
    font-size: 20px;
    transition: border-bottom 0.3s;
    &:focus {
      border-bottom: 1px solid black;
      }
    }
  `;

const GenreInputLine = styled.div`
    position: absolute;
    left: -50px;
    top: 95px;
    margin-top: 15px;
    width: 400px;
    display: flex;
    justify-content: center;
    label {
      &:nth-child(n+2):nth-child(-n+3) {
        margin-top:3px;
        transform: translateX(-5px);
      }
    }
  
    }
  `;

const GenreInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  background-color: inherit;
  color: black;
  font-size: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  border-radius: 15px;
  width: 300px;
  height: 35px;
  color: black;
  font-size: 20px;
  margin: 25px;
  margin-top: 80px;
  cursor: pointer;
  transition: background-color, color 0.3s;
  &:hover {
    background-color: navy;
    color: white;
  }
`;

interface IForm {
  [key: string]: string | number;
}

function UpdateModal({ like, rank }: IUpdateModalProps) {
  const myLikesTemplate = useRecoilValue(myLikesTemplateAtom);
  const currentCategory = useRecoilValue(myLikesCategoryAtom);
  const [updateOn, setUpdateOn] = useRecoilState(updateModalOnAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  useEffect(() => {
    myLikesTemplate[currentCategory]?.typingAttrs
      .split(",")
      .forEach((header) => setValue(header, like[header]));
    setValue(
      myLikesTemplate[currentCategory]?.selectingAttr || "",
      like[myLikesTemplate[currentCategory]?.selectingAttr || ""]
    );
  });
  const onSubmit = async (data: IForm) => {
    if (
      !myLikesTemplate[currentCategory]?.typingAttrs
        .split(",")
        .filter((attr) => like[attr] !== data[attr])
    ) {
      alert("there is no change.");
      return;
    } else if (window.confirm("are you sure updating data?")) {
      const updatingSong = doc(dbService, currentCategory, like.id);
      let updatedLike: { [key: string]: string | number } = {};
      myLikesTemplate[currentCategory]?.typingAttrs
        .split(",")
        .forEach((attr) => (updatedLike[attr] = data[attr]));
      updatedLike[myLikesTemplate[currentCategory]?.selectingAttr || ""] =
        data[myLikesTemplate[currentCategory]?.selectingAttr || ""];
      await updateDoc(updatingSong, {
        ...updatedLike,
        updatedAt: Date.now(),
      });
      alert("updated.");
    }
  };
  const modalClose = () => {
    setUpdateOn((current) => {
      const copyCurrent = [...current];
      const currentIndex = copyCurrent.indexOf(true);
      copyCurrent.splice(currentIndex, 1, false);
      return copyCurrent;
    });
  };
  return (
    <ModalWindow updateOn={updateOn[rank]}>
      <Header>
        <Title>Update</Title>
        <CloseButton onClick={modalClose}>×</CloseButton>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {myLikesTemplate[currentCategory]?.typingAttrs
            .split(",")
            .map((header) => (
              <InputLine key={header}>
                <Label htmlFor="header">{header}</Label>
                <Input
                  id={header}
                  placeholder={header}
                  autoComplete="off"
                  {...register(header, { required: true })}
                />
              </InputLine>
            ))}
          {myLikesTemplate[currentCategory]?.selectingAttr ? (
            <InputLine>
              <Label htmlFor={myLikesTemplate[currentCategory]?.selectingAttr}>
                {myLikesTemplate[currentCategory]?.selectingAttr}
              </Label>
              <select
                id={myLikesTemplate[currentCategory]?.selectingAttr}
                {...register(
                  myLikesTemplate[currentCategory]?.selectingAttr || "",
                  { required: true }
                )}
              >
                {myLikesTemplate[currentCategory]?.selectOptions
                  .split(",")
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </InputLine>
          ) : null}
          <Button>Modify</Button>
        </Form>
      </Container>
    </ModalWindow>
  );
}

export default UpdateModal;
