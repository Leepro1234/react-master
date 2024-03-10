import React, { useState } from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'
import { Categories, categoryState, toDoSelector, toDoState } from '../atoms'
import CreateTodo from './CreateToDo'
import Todo from './ToDo'

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector) //카테고리별로 가져오기
  const [category, setCategory] = useRecoilState(categoryState)

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any)
  }
  console.log(toDos)
  return (
    <div>
      <CreateTodo />
      <h1>To Dos</h1>

      <select value={category} onInput={onInput}>
        <option value={Categories.TODO}>ToDo</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      {toDos?.map(toDo => (
        <Todo key={toDo.id} {...toDo}></Todo>
      ))}
    </div>
  )
}

export default ToDoList
