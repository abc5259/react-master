import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${props =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props =>
    props.isDragging ? "0 2px 25px rgba(0,0,0,0.1)" : "none"};
  div {
    display: flex;
    justify-content: space-between;
    button {
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: red;
      }
    }
  }
`;

interface IDragableCardProps {
  toDoId: number;
  toDoText: string;
  boardId: string;
  index: number;
}

const DragableCard = ({
  boardId,
  toDoId,
  toDoText,
  index,
}: IDragableCardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const deleteToDoBtn = () => {
    setToDos(toDos => {
      const copyToDos = [...toDos[boardId]];
      const newToDos = copyToDos.filter(toDo => toDo.id !== toDoId);
      return {
        ...toDos,
        [boardId]: [...newToDos],
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div>
            <span>{toDoText}</span>
            <button onClick={deleteToDoBtn}>X</button>
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragableCard);
