import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../../api";
import { makeImagePath } from "../../utils";
import { FaArrowRight } from "react-icons/fa";
import {
  Banner,
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  Box,
  Info,
  Loader,
  Overlay,
  OverView,
  Row,
  Slider,
  Title,
  Wrapper,
} from "./HomeStyles";
import { useHistory, useRouteMatch } from "react-router";

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
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
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
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOVerlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      history.push("/");
    }
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(movie => movie.id === +bigMovieMatch.params.movieId);
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
                      layoutId={`${movie.id}`}
                      variants={BoxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id)}
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
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOVerlayClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  scrolly={scrollY.get() + 50}
                  layoutId={`${bigMovieMatch.params.movieId}`}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      >
                        <BigTitle>{clickedMovie.title}</BigTitle>
                      </BigCover>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
