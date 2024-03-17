import styled from 'styled-components'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const boxVariants = {
  hover: { scale: 2, rotateZ: 90 },
  click: { scale: 1, borderRadius: '100px' },
  drag: { backgroundColor: 'rgb(46, 204, 113)', transition: { duration: 3 } },
}

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`

function App2() {
  const biggerBoxRef = useRef<HTMLDivElement>(null)
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragConstraints={biggerBoxRef} //드래깅 영역 제한 ( 비거박스의 사이즈만큼 )
          dragElastic={0.5} //마우스에 당겨져 따라오는 힘
          whileDrag="drag"
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        ></Box>
      </BiggerBox>
    </Wrapper>
  )
}

export default App2
