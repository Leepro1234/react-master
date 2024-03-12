import { useRef } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { styled } from 'styled-components'
import { ITodo, toDoState } from '../atoms'
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
export interface IAreaProps {
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
  toDos: ITodo[]
  boardId: string
}
const Form = styled.form`
  margin-top: 10px;
  width: 100%;
`
const Text = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  font-size: 20px;
`

interface IForm {
  toDo: string
}
function Board({ toDos, boardId }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const onClick = () => {
    inputRef.current?.focus()
    setTimeout(() => {
      inputRef.current?.blur()
    }, 5000)
  }
  const { register, setValue, handleSubmit } = useForm<IForm>()
  const setTodos = useSetRecoilState(toDoState)
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    }
    setTodos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo], //boardId = todo,done,doing
      }
    })
    setValue('toDo', '')
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input ref={inputRef} placeholder="grab me" />
      <button onClick={onClick}>click me</button>
      <Form onSubmit={handleSubmit(onValid)}>
        <Text
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add Task ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef} //beautiful-dnd 가 html 요소에 접근할 수 있도록 함
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              //쪼끄만놈들
              <DragableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              ></DragableCard>
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}
export default Board
