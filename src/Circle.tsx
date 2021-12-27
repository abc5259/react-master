import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  border: 1px solid ${props => props.borderColor};
`;

interface CirclePorps {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CirclePorps) {
  return <Container bgColor={bgColor} borderColor={borderColor ?? "white"} />;
}

export default Circle;
