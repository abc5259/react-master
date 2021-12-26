import styled from "styled-components";

const Fater = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

function App() {
  return (
    <Fater as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Fater>
  );
}

export default App;
