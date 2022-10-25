import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import MyLike from "./components_mylikes/MyLike";
import { mylikesCategoryAtom } from "./components_mylikes/atoms_mylikes";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { loggedInUserAtom } from "../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  background-color: navy;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 10px;
  color: white;
`;

const Menu = styled.div`
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: transparent;
  width: 80px;
  height: 40px;
  margin: 0 20px;
  border: none;
  font-size: 20px;
  color: white;
  text-decoration: underline;
  transition: 0.2s;
  cursor:pointer;
  &:hover {
    color: #ff0063;}
  }
`;

interface ItempForm {
  categoryName: string;
  inputInfos: string;
  radioInfo: string;
  radioInfos: string;
}

function MyLikes() {
  const setMyLikesCategory = useSetRecoilState(mylikesCategoryAtom);
  const navigate = useNavigate();
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentCategory = event.currentTarget.innerText;
    setMyLikesCategory(currentCategory);
    navigate(`/mylikes/${currentCategory}/table`);
  };

  const [myLikesTemplate, setMyLikesTemplate] = useState({});
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const { register, handleSubmit } = useForm<ItempForm>();
  const [addTempCategory, setAddTempCategory] = useState(false);
  const tempClick = () => {
    setAddTempCategory((prev) => !prev);
  };
  const tempSubmit = async (data: ItempForm) => {
    const categoryTemplate = {
      inputInfos: data.inputInfos.replace(/ /g, ""),
      radioInfo: data.radioInfo.replace(/ /g, ""),
      raedioInfos: data.radioInfos.replace(/ /g, ""),
    };
    try {
      await setDoc(
        doc(dbService, "MyLikes_template", `template_${loggedInUser?.uid}`),
        { [data.categoryName]: categoryTemplate },
        { merge: true }
      ); //add ranking_uid document
    } catch (e) {
      console.error("Error adding document", e);
    }
  };
  useEffect(() => {
    onSnapshot(
      doc(dbService, "MyLikes_template", `template_${loggedInUser?.uid}`),
      (doc) => {
        let templateDB = {};
        templateDB = { ...templateDB, ...doc.data() };
        setMyLikesTemplate(templateDB);
      }
    );
    console.log("mylikes_template set.");
  }, []);
  console.log("template----", myLikesTemplate);

  return (
    <>
      <Wrapper>
        <Header>
          <Title>
            My Likes
            <button onClick={tempClick}>temp +</button>
            {addTempCategory ? (
              <form onSubmit={handleSubmit(tempSubmit)}>
                <label htmlFor="categoryName">category Name</label>
                <input id="categoryName" {...register("categoryName")}></input>
                <label htmlFor="inputInfos">input infos</label>
                <input id="inputInfos" {...register("inputInfos")}></input>
                <label htmlFor="radioInfo">radio infos</label>
                <input id="radioInfo" {...register("radioInfo")}></input>
                <label htmlFor="radioInfos">radio infos</label>
                <input id="radioInfos" {...register("radioInfos")}></input>
                <button>submit</button>
              </form>
            ) : null}
          </Title>
          <Menu>
            {Object.keys(myLikesTemplate).map((category) => (
              <Button key={category} onClick={onClick}>
                {category}
              </Button>
            ))}
          </Menu>
        </Header>
        <Routes>
          <Route path="/:category/*" element={<MyLike />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default MyLikes;
