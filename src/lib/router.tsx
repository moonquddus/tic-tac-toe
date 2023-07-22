import { createBrowserRouter } from 'react-router-dom'
import Menu from '../components/page/Menu/Menu'
import Game from '../components/page/Game/Game'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
  },
  {
    path: '/game',
    element: <Game />,
  },
])
