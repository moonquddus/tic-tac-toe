import { createMemoryRouter } from 'react-router-dom'
import Menu from '../components/page/Menu/Menu'
import Game from '../components/page/Game/Game'

export enum PAGE_PATH {
  MENU = '/',
  GAME = '/game'
}

export const router = createMemoryRouter([
  {
    path: PAGE_PATH.MENU,
    element: <Menu />,
  },
  {
    path: PAGE_PATH.GAME,
    element: <Game />,
  },
])
