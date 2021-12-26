import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0)
  }
  50% {
    transform: rotate(360deg)
  }
  100% {
    transform: rotate(0)
  }
`;

const Emoji = styled.span`
  font-size: 100px;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotationAnimation} 3s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 40px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>🧐</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
