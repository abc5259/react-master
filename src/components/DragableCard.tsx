import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${props =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props =>
    props.isDragging ? "0 2px 25px rgba(0,0,0,0.1)" : "none"};
`;

interface IDragableCardProps {
  toDo: string;
  index: number;
}

const DragableCard = ({ toDo, index }: IDragableCardProps) => {
  console.log(toDo, "has been rendered");
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragableCard);
