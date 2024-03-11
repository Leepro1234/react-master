import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { styled } from 'styled-components'
import DragableCard from './DragableCard'
const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 18px;
`
interface IAreaProps {
  isDraggingOver: boolean
  isDraggingFromThis: boolean
}

const Area = styled.div<IAreaProps>`
  background-color: ${props =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1; //flexbox부모의 크기를 유연하게 조절함
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`
interface IBoardProps {
  toDos: string[]
  boardId: string
}
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragableCard key={toDo} index={index} toDo={toDo}></DragableCard>
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}
export default Board
