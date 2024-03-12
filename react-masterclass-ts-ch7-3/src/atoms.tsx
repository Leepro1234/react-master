import { atom, selector } from 'recoil'

export interface ITodo {
  id: number
  text: string
}
interface IToDoState {
  [key: string]: ITodo[] //string으로된 key의 string Array로 이루어져있음
}
export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do': [],
    Doing: [],
    Done: [],
  },
})
