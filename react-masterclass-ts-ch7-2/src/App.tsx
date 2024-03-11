import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import { Container, Header, Title } from './components/Layout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRecoilState } from 'recoil'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import React from 'react'
import { toDoState } from './atoms'
import DragableCard from './components/Dragablecard'

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const orDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return

    setToDos(oldToDos => {
      //oldToDos를 복사함 (불변성을위해)
      //source(원본)을 제거
      //이동되는곳의 index에 입력
      const copyToDos = [...oldToDos]
      copyToDos.splice(source.index, 1)
      copyToDos.splice(destination?.index, 0, draggableId)

      return copyToDos
    })
  }
  return (
    <div>
      <Header>
        <Title>Todo List</Title>
      </Header>
      <Container>
        <Boards>
          <DragDropContext onDragEnd={orDragEnd}>
            <Droppable droppableId="one">
              {magic => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <DragableCard
                      key={toDo}
                      index={index}
                      toDo={toDo}
                    ></DragableCard>
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </DragDropContext>
        </Boards>
        <Outlet context={{}} />
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </Container>
    </div>
  )
}

export default App
