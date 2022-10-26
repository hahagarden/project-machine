import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { myLikesCategoryAtom, myLikesTemplateAtom } from "./atoms_mylikes";
import PaintBoard from "./PaintBoard";

const animation_boards = keyframes`
  from{
    opacity:0%;
  }
  to{
    opacity:100%;
  };
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  animation: ${animation_boards} 0.4s ease-out;
`;

const Boards = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  padding: 50px;
  background-color: #f1f2f6;
  box-shadow: 4px 4px 7px 3px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  justify-content: space-around;
`;

function Board() {
  const { category } = useParams();
  const currentCategory = category ?? "";
  const myLikesTemplate = useRecoilValue(myLikesTemplateAtom);
  const selectOptions =
    myLikesTemplate[currentCategory]?.selectOptions.split(",");
  const onDragEnd = (info: DropResult) => {
    console.log(info);
  };
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          {selectOptions?.map((option, index) => (
            <PaintBoard key={index} boardId={option} />
          ))}
        </Boards>
      </DragDropContext>
    </Wrapper>
  );
}

export default Board;
