import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import MyLike from "./components_mylikes/MyLike";
import {
  currentCategoryAtom,
  categoryTemplateAtom,
} from "./components_mylikes/atoms_mylikes";
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

const Categories = styled.div`
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

interface IAddCategoryForm {
  categoryName: string;
  typingAttrs: string;
  selectingAttr: string;
  selectOptions: string;
}

function MyLikes() {
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const navigate = useNavigate();
  const categoryClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const currentCategory = event.currentTarget.innerText;
    setCurrentCategory(currentCategory);
    navigate(`/mylikes/${currentCategory}/table`);
  };

  const [categoryTemplate, setCategoryTemplate] =
    useRecoilState(categoryTemplateAtom);
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const { register, handleSubmit } = useForm<IAddCategoryForm>();
  const [addCategory, setAddCategory] = useState(false);
  useEffect(() => {
    onSnapshot(
      doc(dbService, "MyLikes_template", `template_${loggedInUser?.uid}`),
      (doc) => {
        let templateDB = {};
        templateDB = { ...templateDB, ...doc.data() };
        setCategoryTemplate(templateDB);
      }
    );
  }, []);
  const addCategoryClick = () => {
    setAddCategory((prev) => !prev);
  };
  const addCategorySubmit = async (data: IAddCategoryForm) => {
    const categoryTemplate = {
      typingAttrs: data.typingAttrs.replace(/ /g, ""),
      selectingAttr: data.selectingAttr.replace(/ /g, ""),
      selectOptions: data.selectOptions.replace(/ /g, ""),
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

  return (
    <>
      <Wrapper>
        <Header>
          <Title>
            My Likes
            <button onClick={addCategoryClick}> + </button>
            {addCategory ? (
              <form onSubmit={handleSubmit(addCategorySubmit)}>
                <label htmlFor="categoryName">category Name</label>
                <input
                  id="categoryName"
                  {...register("categoryName", { required: true })}
                ></input>
                <label htmlFor="typingAttrs">typable Attributes</label>
                <input
                  id="typingAttrs"
                  {...register("typingAttrs", {
                    required: true,
                    pattern: /^[a-z,]+$/i,
                    validate: (value) =>
                      value.includes("name") || value.includes("title"),
                  })}
                ></input>
                <label htmlFor="selectingAttr">selectable Attribute</label>
                <input
                  id="selectingAttr"
                  {...register("selectingAttr")}
                ></input>
                <label htmlFor="selectOptions">select Options</label>
                <input
                  id="selectOptions"
                  {...register("selectOptions")}
                ></input>
                <button>submit</button>
              </form>
            ) : null}
          </Title>
          <Categories>
            {Object.keys(categoryTemplate).map((category) => (
              <Button key={category} onClick={categoryClick}>
                {category}
              </Button>
            ))}
          </Categories>
        </Header>
        <Routes>
          <Route path="/:category/*" element={<MyLike />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default MyLikes;
