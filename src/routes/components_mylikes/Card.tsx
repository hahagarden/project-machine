import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { InterfaceSong } from "./atoms_mylikes";
import { useState } from "react";

interface CardProps {
  key: string;
  song: InterfaceSong;
  index: number;
}

const DraggableCard = styled.div<{ song: InterfaceSong }>`
  background-color: white;
  box-shadow: inset 0px 0px 4px 1px rgba(0,0,0,0.7);
  border-radius: 20px;
  color: navy;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  margin: 10px;
  transition: 0.2s;
  &:hover{
    background-color:#f0932b;
    color:white;
  }
  }
`;

function Card({ song, index }: CardProps) {
  const [mouseOn, setMouseOn] = useState(false);
  const onMouseEnter = () => {
    setMouseOn(true);
  };
  const onMouseLeave = () => {
    setMouseOn(false);
  };
  return (
    <Draggable draggableId={song.id} index={index}>
      {(provided) => (
        <DraggableCard
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          song={song}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {mouseOn ? song.singer : song.title}
        </DraggableCard>
      )}
    </Draggable>
  );
}

export default Card;
