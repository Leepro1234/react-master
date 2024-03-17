import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { getMovies, IGetMoviesResult } from '../api'
import { makeImagePath } from '../libs/utils'

const Wrapper = styled.div`
  background: black;
`

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.bgPhoto});
  background-size: cover;
`

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`
const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Slider = styled.div`
  position: relative;
  top: -100px;
`

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  margin-bottom: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`

const BigMovie = styled(motion.div)<{ scrollY: any }>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`

const BigTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -60px;
`

const BigOverview = styled.div`
  padding: 20px;
  color: ${props => props.theme.white.lighter};
`

const rowVariants = {
  hidden: {
    //이동할때 갭 10
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    //이동할때 갭 10
    x: -window.outerWidth - 10,
  },
}

const BoxVariants = {
  normar: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.1,
      duration: 0.3,
      type: 'tween',
    },
  },
}

const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.3,
      type: 'tween',
    },
  },
}

const offset = 6
function Home() {
  const navigate = useNavigate()
  const bigMovieMatch = useMatch(`/movies/:movieId`)

  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['imoviesnfo', 'noePlaying'],
    queryFn: () => getMovies(),
  })

  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const incraseIndex = () => {
    if (data) {
      if (leaving) return
      toggleLeaving()

      const totalMovies = data.results.length - 1
      const maxIndex = Math.floor(totalMovies / offset - 1)
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1))
    }
  }
  const toggleLeaving = () => setLeaving(prev => !prev)
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`)
  }
  const onOverlayClick = () => navigate('/')
  const { scrollY } = useScroll()
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(movie => movie.id + '' === bigMovieMatch.params.movieId)
  console.log(clickedMovie)
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  type: 'tween',
                  duration: 1,
                }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map(movie => (
                    <Box
                      layoutId={movie.id + ''}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: 'tween' }}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path || '', 'w400')}
                    >
                      <Info variants={InfoVariants}>
                        {' '}
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  scrollY={scrollY.get() + 100}
                  layoutId={bigMovieMatch.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      ></BigCover>
                      <BigTitle>{clickedMovie.title}</BigTitle>
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
  )
}

export default Home
