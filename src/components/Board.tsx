import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragableCard from "./DragableCard";

const Wrapper = styled.div`
  padding: 10px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  h1 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 800;
  }
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  return (
    <Wrapper>
      <h1>{boardId}</h1>
      <Droppable droppableId={boardId}>
        {provided => (
          <div
            style={{ backgroundColor: "red" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
