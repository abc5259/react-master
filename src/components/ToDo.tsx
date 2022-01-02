import { IToDo } from "../atoms";

const ToDo = ({ text, catagory, id }: IToDo) => {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
};

export default ToDo;
