import styled, { keyframes } from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { Droppable } from "react-beautiful-dnd";
import { likesGenreSelector, myLikesCategoryAtom } from "./atoms_mylikes";
import PaintCard from "./PaintCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const animation_board = keyframes`
  0%{
    opacity:0%;
    transform:translateY(0%);
  }
40%{transform:translateY(-5%);}

  100%{
    opacity:100%;
    transform:translateY(0%);
  };
`;

interface BoardProps {
  boardId: string;
}

const Wrapper = styled.div`
  width: 350px;
  height: 400px;
  padding: 10px;
  background-color: navy;
  box-shadow: 3px 3px 6px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  border-radius: 50px;
  flex-direction: column;
  animation: ${animation_board} 0.5s ease-out;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 25px;
  margin: 15px;
  color: white;
`;

const DroppableBoard = styled.div`
  background-color: transparent;
`;

function PaintBoard({ boardId }: BoardProps) {
  const [currentCategory, setCurrentCategory] =
    useRecoilState(myLikesCategoryAtom);
  const { category } = useParams();
  useEffect(() => {
    setCurrentCategory(category ?? "");
  }, [category]);
  const selectedLikes = useRecoilValue(likesGenreSelector(boardId));
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <DroppableBoard ref={provided.innerRef} {...provided.droppableProps}>
            {selectedLikes.map((like, index) => (
              <PaintCard key={like.id} like={like} index={index} />
            ))}
            {provided.placeholder}
          </DroppableBoard>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default PaintBoard;
