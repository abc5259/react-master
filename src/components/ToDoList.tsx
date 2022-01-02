import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }
  ul {
    margin-top: 20px;
  }
`;

const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);
  return (
    <ToDoContainer>
      <h1>To Dos</h1>
      <CreateToDo />
      <ul>
        {toDos.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </ToDoContainer>
  );
};

export default ToDoList;
