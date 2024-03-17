import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { isJSDocReturnTag } from 'typescript'
import { BlobOptions } from 'buffer'
const Wrapper = styled(motion.div)`
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px;
`
const boxVariants = {
  entry: (back: boolean) => {
    return {
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  leaving: (back: boolean) => {
    console.log(back)
    return {
      x: back ? 500 : -500,
      opacity: 0,
      rotateX: 180,
      transition: {
        duration: 0.3,
      },
    }
  },
}

//AnimatePresence
//이놈이 null리턴을할때 exit animatioㅜ을 실행해준다
//버튼클릭 > index가수정됨 > box(index)가 사라지면서 exit 발동 > 바뀐 박스(index)가 그려지면서
//에니메이션실행
// mode="wait"
export default function App41() {
  const [visible, setVisible] = useState(1)
  const [back, setBack] = useState(false)

  const nextPlease = async () => {
    await setBack(false)
    setVisible(prev => (prev === 10 ? 10 : prev + 1))
  }
  const prevPlease = async () => {
    await setBack(true)
    setVisible(prev => (prev === 1 ? 1 : prev - 1))
  }
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          custom={back}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="leaving"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  )
}
