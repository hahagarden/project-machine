import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import {
  ILike,
  myLikesCategoryAtom,
  myLikesTemplateAtom,
} from "./atoms_mylikes";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

interface CardProps {
  key: string;
  like: ILike;
  index: number;
}

const DraggableCard = styled.div<{ like: ILike }>`
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

function PaintCard({ like, index }: CardProps) {
  const { category } = useParams();
  const currentCategory = category ?? "";
  const myLikesTemplate = useRecoilValue(myLikesTemplateAtom);
  const [mouseOn, setMouseOn] = useState(false);
  const onMouseEnter = () => {
    setMouseOn(true);
  };
  const onMouseLeave = () => {
    setMouseOn(false);
  };
  return (
    <Draggable draggableId={like.id} index={index}>
      {(provided) => (
        <DraggableCard
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          like={like}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {mouseOn
            ? myLikesTemplate[currentCategory]?.typingAttrs
                .split(",")
                .slice(1)
                .map((attr) => `${like[attr]}`)
                .join(" || ")
            : like.title}
        </DraggableCard>
      )}
    </Draggable>
  );
}

export default PaintCard;
