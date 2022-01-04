import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import DragableCard from "./components/DragableCard";

const Wrapper = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //same board movement
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
