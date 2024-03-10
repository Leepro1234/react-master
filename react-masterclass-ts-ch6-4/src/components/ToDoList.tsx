import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
})
interface IForm {
  toDo: string

  errors: {
    toDo?: {
      message: string
    }
  }
  extraError?: string
}

interface IToDo {
  text: string
  id: number
  cateogory: 'DONE' | 'DOING' | 'TODO'
}
function ToDoList() {
  const [toDos, setTodos] = useRecoilState(toDoState)
  const handleValid = ({ toDo }: IForm) => {
    setTodos(oldToDos => [
      { text: toDo, cateogory: 'TODO', id: Date.now() },
      ...oldToDos,
    ])
  }
  const {
    register, //Input 이벤트 포함
    handleSubmit, //onSubmit이벤트, 유효성체크 포함
    formState: { errors }, //from state
    setError,
  } = useForm<IForm>({
    defaultValues: {
      toDo: '',
    },
  })

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        //submit시 유효성 체크를 위해 사용
        onSubmit={handleSubmit(handleValid)}
      >
        <input
          {...register('toDo', {
            //input의 이름
            required: 'toDo는 필수입니다.', //필수일때 에러메시지. 이걸 해줘야 erros.email.message객체가 생김 아니면 error.email.reuired로 나옴
          })}
          placeholder="toDo"
        />
        <span>{errors?.toDo?.message}</span>
        <button>Add</button>
      </form>
      <ul style={{ color: 'white' }}>
        {toDos.map(toDo => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
