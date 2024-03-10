import { useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { categoryState, toDoState } from '../atoms'

export interface IForm {
  toDo: string

  errors: {
    toDo?: {
      message: string
    }
  }
  extraError?: string
}

function CreateTodo() {
  const setToDos = useSetRecoilState(toDoState)
  const category = useRecoilValue(categoryState)
  const handleValid = ({ toDo }: IForm) => {
    setToDos(oldToDos => [
      { text: toDo, cateogory: category, id: Date.now() },
      ...oldToDos,
    ])
    console.log(category)
  }
  const {
    register,
    handleSubmit,
    formState: { errors }, //from state
  } = useForm<IForm>()
  return (
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
      <span style={{ color: 'white' }}>{errors?.toDo?.message}</span>
      <button>Add</button>
    </form>
  )
}

export default CreateTodo
