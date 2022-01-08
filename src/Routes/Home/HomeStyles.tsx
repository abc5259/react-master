import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: black;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgphoto});
  background-size: cover;
  background-color: rgba(0, 0, 0, 1);
  background-repeat: no-repeat;
  background-position: center;
`;

export const Title = styled.h2`
  font-size: 4vw;
  margin-bottom: 20px;
`;
export const OverView = styled.p`
  font-size: 2vw;
  width: 50%;
`;

export const Slider = styled.div`
  position: relative;
  top: -90px;
  &:hover {
    button {
      opacity: 1;
    }
  }
`;
export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  button {
    opacity: 0;
    position: absolute;
    top: 0px;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 30px;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 100%;
  }
`;
export const Box = styled(motion.div)<{ bgphoto: string }>`
  box-sizing: border-box;
  /* position: relative; */
  background-color: white;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: 60%;
  color: red;
  font-size: 14px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:nth-child(6) {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
  box-sizing: border-box;
  height: 30px;
  color: white;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  h4 {
    font-size: 18px;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const BigMovie = styled(motion.div)<{ scrolly: number }>`
  position: absolute;
  top: ${props => `${props.scrolly}px`};
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40vw;
  min-height: 40vw;
  max-height: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${props => props.theme.black.lighter};
`;

export const BigCover = styled.div`
  width: 100%;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 60%;
`;

export const BigTitle = styled.h3`
  position: absolute;
  bottom: 0;
  left: 5%;
  color: ${props => props.theme.white.lighter};
  text-align: center;
  font-size: 1.2rem;
`;

export const BigOverview = styled.p`
  padding: 20px;
  color: ${props => props.theme.white.lighter};
`;
