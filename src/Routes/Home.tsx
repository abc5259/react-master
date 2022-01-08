import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { FaArrowRight } from "react-icons/fa";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 4vw;
  margin-bottom: 20px;
`;
const OverView = styled.p`
  font-size: 2vw;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -90px;
  &:hover {
    button {
      opacity: 1;
    }
  }
`;
const Row = styled(motion.div)`
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
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 30px;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 100%;
  }
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
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

const rowVariants = {
  hidden: (innerWidth: number) => {
    return {
      x: innerWidth + 10,
    };
  },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 1,
    },
  },
  exit: (innerWidth: number) => {
    return {
      x: -innerWidth - 10,
      transition: {
        type: "tween",
        duration: 1,
      },
    };
  },
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.3, type: "tween" },
  },
};

const offset = 6;

const Home = () => {
  //Moives Data 가져오기
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  // Slider Row key
  const [index, setIndex] = useState(0);
  // window innerWidth
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      event.currentTarget.style.opacity = "0";
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [innerWidth]);
  const toggleLeaving = () => setLeaving(prev => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <Slider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={innerWidth}
            >
              <Row
                custom={innerWidth}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map(movie => (
                    <Box
                      variants={BoxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    />
                  ))}
                <button onClick={incraseIndex}>
                  <FaArrowRight />
                </button>
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
