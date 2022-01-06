import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgPhoto});
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
  top: -200px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 64px;
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

const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const incraseIndex = () => setIndex(prev => prev + 1);
  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [innerWidth]);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <Slider>
            <AnimatePresence custom={innerWidth}>
              <Row
                custom={innerWidth}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
              >
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Box key={i}>{i}</Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
