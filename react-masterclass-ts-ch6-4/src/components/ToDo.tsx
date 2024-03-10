import { useSetRecoilState } from 'recoil'
import { Categories, IToDo, toDoState } from '../atoms'

function Todo({ text, cateogory, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState)
  const onClick = (newCategory: IToDo['cateogory']) => {
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
      console.log(targetIndex)
      const oldTodo = oldToDos[targetIndex]
      const newTodo = { text, id, cateogory: newCategory }
      console.log(oldTodo, newTodo)
      return [
        ...oldToDos.slice(0, targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex + 1),
      ]
    })
  }
  return (
    <li>
      <span>{text}</span>
      {cateogory !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {cateogory !== Categories.TODO && (
        <button onClick={() => onClick(Categories.TODO)}>To Do</button>
      )}
      {cateogory !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
    </li>
  )
}

export default Todo
