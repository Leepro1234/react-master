import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import App2 from './Apps/App2'
import App3 from './Apps/App3'
import App4 from './Apps/App4'
import App41 from './Apps/App4-1'
import App5 from './Apps/App5'
import App6 from './Apps/App6'
import App7 from './Apps/App7'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/App2',
    element: <App2 />,
  },
  {
    path: '/App3',
    element: <App3 />,
  },
  {
    //AnimatePresence
    path: '/App4',
    element: <App4 />,
  },
  {
    //AnimatePresence
    path: '/App4-1',
    element: <App41 />,
  },
  {
    //AnimatePresence
    path: '/App5',
    element: <App5 />,
  },
  {
    //AnimatePresence
    path: '/App6',
    element: <App6 />,
  },
  {
    //AnimatePresence
    path: '/App7',
    element: <App7 />,
  },
])
export default router
