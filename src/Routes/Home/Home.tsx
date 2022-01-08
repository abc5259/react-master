import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../../api";
import { makeImagePath } from "../../utils";
import { FaArrowRight } from "react-icons/fa";
import {
  Banner,
  Box,
  Info,
  Loader,
  OverView,
  Row,
  Slider,
  Title,
  Wrapper,
} from "./HomeStyles";

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
    zIndex: 999,
    scale: 1.3,
    y: -50,
    transition: { delay: 0.3, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
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
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
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
