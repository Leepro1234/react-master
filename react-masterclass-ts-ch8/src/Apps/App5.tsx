import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { isJSDocReturnTag } from 'typescript'
import { BlobOptions } from 'buffer'
const Wrapper = styled(motion.div)`
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

export default function App5() {
  const [clicked, setclicked] = useState(false)
  const toggleClicked = () => setclicked(prev => !prev)
  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        {!clicked ? (
          <Circle layoutId="circle" style={{ borderRadius: 50 }} />
        ) : null}
      </Box>
      <Box>
        {clicked ? (
          <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }} />
        ) : null}
      </Box>
    </Wrapper>
  )
}
