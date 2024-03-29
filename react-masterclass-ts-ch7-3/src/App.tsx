import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import { Container, Header, Title } from './components/Layout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRecoilState } from 'recoil'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import React from 'react'
import { toDoState } from './atoms'
import Board, { IAreaProps } from './components/Board'
import { FaRegTrashAlt } from 'react-icons/fa'

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`

const Trash = styled.div<IAreaProps>`
  display: grid;
  width: 100%;
  height: 50px;
  grid-column: 1 / -1; /* 첫 번째 열부터 마지막 열까지 차지하도록 설정 */
  background-color: #c7ecee;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  padding: 0px 270px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const orDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return

    if (destination.droppableId === 'Trash') {
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]]
        boardCopy.splice(source.index, 1)
        return { ...allBoards, [source.droppableId]: boardCopy }
      })
      return
    }

    if (destination?.droppableId === source.droppableId) {
      //같은 보드에서 움직였음.
      setToDos(allBoards => {
        //oldToDos를 복사함 (불변성을위해)
        //source(원본)을 제거
        //이동되는곳의 index에 입력
        const boardCopy = [...allBoards[source.droppableId]]
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, taskObj)

        //source.droppableId 보드의 결과를 바꿔끼운다.
        return { ...allBoards, [source.droppableId]: boardCopy }
      })
    }

    if (destination?.droppableId !== source.droppableId) {
      //같은 보드에서 움직였음.
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]]
        const taskObj = sourceBoard[source.index]
        const targetBoard = [...allBoards[destination.droppableId]]
        sourceBoard.splice(source.index, 1)
        targetBoard.splice(destination?.index, 0, taskObj)

        //source.droppableId 보드의 결과를 바꿔끼운다.
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        }
      })
    }
  }
  return (
    <div>
      <Header>
        <Title>Todo List</Title>
      </Header>
      <Container>
        <Boards>
          <DragDropContext onDragEnd={orDragEnd}>
            {Object.keys(toDos).map(boardId => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}

            <Droppable droppableId="Trash">
              {(magic, snapshot) => (
                <Trash
                  isDraggingOver={snapshot.isDraggingOver}
                  isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                  ref={magic.innerRef} //beautiful-dnd 가 html 요소에 접근할 수 있도록 함
                  {...magic.droppableProps}
                >
                  <FaRegTrashAlt />
                </Trash>
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
