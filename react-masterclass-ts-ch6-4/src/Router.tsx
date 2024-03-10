import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ToDoList from './components/ToDoList'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'todoList',
        element: <ToDoList />,
      },
    ],
  },
])
export default router
