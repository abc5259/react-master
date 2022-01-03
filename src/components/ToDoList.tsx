import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FlexBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 420px;
  div {
    text-align: center;
    h2 {
      margin-bottom: 20px;
    }
    li {
      margin-bottom: 10px;
    }
  }
`;

const ToDoList = () => {
  // const toDos = useRecoilValue(toDoState);
  const [toDos, doing, done] = useRecoilValue(toDoSelector);
  return (
    <ToDoContainer>
      <h1>To Dos</h1>
      <CreateToDo />
      <FlexBox>
        <div>
          <h2>To Do</h2>
          <ul>
            {toDos.map(toDo => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </div>
        <hr />
        <div>
          <h2>Doing</h2>
          <ul>
            {doing.map(toDo => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </div>
        <hr />
        <div>
          <h2>Done</h2>
          <ul>
            {done.map(toDo => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </div>
      </FlexBox>
    </ToDoContainer>
  );
};

export default ToDoList;
