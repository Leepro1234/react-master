import { atom, selector } from 'recoil'
import Todo from './components/ToDo'

export enum Categories {
  'TODO' = 'TODO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}
export interface IToDo {
  text: string
  id: number
  cateogory: Categories
}

export const categoryState = atom<Categories>({
  key: 'cateogry',
  default: Categories.TODO,
})

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
})

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState)
    const category = get(categoryState)
    console.log('atoms', toDos)
    if (category === Categories.TODO)
      return toDos.filter(toDo => toDo.cateogory === Categories.TODO)
    if (category === Categories.DOING)
      return toDos.filter(toDo => toDo.cateogory === Categories.DOING)
    if (category === Categories.DONE)
      return toDos.filter(toDo => toDo.cateogory === Categories.DONE)
  },
})
