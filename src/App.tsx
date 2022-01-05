import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing(show => !show);
  };
  return (
    <>
      <Wrapper>
        <button onClick={onClick}>Click</button>
        <AnimatePresence>
          {showing ? (
            <Box
              initial="initial"
              animate="visible"
              exit="leaving"
              variants={boxVariants}
            />
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default App;
