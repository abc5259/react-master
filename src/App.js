import styled from "styled-components";

const Fater = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: aqua;
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Fater>
      <BoxOne />
      <BoxTwo />
    </Fater>
  );
}

export default App;
