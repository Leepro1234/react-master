import styled from 'styled-components'
import { motion } from 'framer-motion'
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
const myVars = {
  //sptring 튕기고 damping 반동은 5 반동이0이면 무중력상태로 게속 튕긴다
  start: { scale: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: {
      type: 'spring',
      delay: 1,
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
}

const boxVariants = {
  //sptring 튕기고 damping 반동은 5 반동이0이면 무중력상태로 게속 튕긴다
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
}

const circleVariants = {
  //sptring 튕기고 damping 반동은 5 반동이0이면 무중력상태로 게속 튕긴다
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transtition: {
      delay: 0.5,
    },
  },
}

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  )
}

export default App
