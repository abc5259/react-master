import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  catagory: "TO_DO" | "DONE" | "DOING";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter(toDo => toDo.catagory === "TO_DO"),
      toDos.filter(toDo => toDo.catagory === "DOING"),
      toDos.filter(toDo => toDo.catagory === "DONE"),
    ];
  },
});

//state를 입력 받아서 그걸 변형해 반환하는 순수함수를 거쳐 반환된 값을 말합니다.
// atom의 output을 변형시키는 도구
