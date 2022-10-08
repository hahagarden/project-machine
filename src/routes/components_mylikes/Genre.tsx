import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled, { keyframes } from "styled-components";
import { songGenres } from "./atoms_mylikes";
import Board from "./Board";

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

function Genre() {
  const onDragEnd = (info: DropResult) => {
    console.log(info);
  };
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          {Object.keys(songGenres).map((genre, index) => (
            <Board key={index} boardId={genre} />
          ))}
        </Boards>
      </DragDropContext>
    </Wrapper>
  );
}

export default Genre;
