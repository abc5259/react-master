import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.backgroundColor};
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

const Title = styled.span`
  font-size: 100px;
  color: ${props => props.theme.textColor};
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotationAnimation} 3s linear infinite;
  ${Title} {
    &:hover {
      font-size: 40px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box bgColor="teal">
        <Title>hi</Title>
      </Box>
    </Wrapper>
  );
}

export default App;
