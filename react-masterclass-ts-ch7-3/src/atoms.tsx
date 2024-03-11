import { atom, selector } from 'recoil'

interface IToDoState {
  [key: string]: string[] //string으로된 key의 string Array로 이루어져있음
}
export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do': ['a', 'b'],
    Doing: ['c', 'd', 'e'],
    Done: ['f'],
  },
})
