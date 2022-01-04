import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
`;

interface IDragableCardProps {
  toDo: string;
  index: number;
}

const DragableCard = ({ toDo, index }: IDragableCardProps) => {
  console.log(toDo, "has been rendered");
  return (
    <Draggable draggableId={toDo} index={index}>
      {provided => (
        <Card
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