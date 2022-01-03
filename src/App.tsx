import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {/* Droppable안에 component를 넣으면 바로 사용할 수 있는 무언가를 얻어  */}
          <Droppable droppableId="one">
            {() => (
              <ul>
                <Draggable draggableId="first" index={0}>
                  {() => <li>One</li>}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {() => <li>Two</li>}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
