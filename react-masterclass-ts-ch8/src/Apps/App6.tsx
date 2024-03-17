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
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`
const Box = styled(motion.div)`
  height: 200px;
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

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default function App6() {
  const [clicked, setclicked] = useState(false)
  const toggleClicked = () => setclicked(prev => !prev)

  const [id, setId] = useState<null | string>(null)
  console.log(id)
  return (
    <Wrapper>
      <Grid>
        {['1', '2', '3', '4'].map(n => (
          <Box onClick={() => setId(n)} key={n} layoutId={n} />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  )
}
