import styled from "styled-components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import MyLike from "./components_mylikes/MyLike";
import { mylikesCategoryAtom } from "./components_mylikes/atoms_mylikes";

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

function MyLikes() {
  const setMyLikesCategory = useSetRecoilState(mylikesCategoryAtom);
  const navigate = useNavigate();
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentCategory = event.currentTarget.innerText;
    setMyLikesCategory(currentCategory + "s");
    navigate(`/mylikes/${currentCategory}/table`);
  };
  return (
    <>
      <Wrapper>
        <Header>
          <Title>My Likes</Title>
          <Menu>
            <Button onClick={onClick}>song</Button>
            <Button onClick={onClick}>movie</Button>
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
