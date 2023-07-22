import { RouterProvider } from 'react-router-dom'
import { router } from '../../../lib/router'
import styles from './App.module.css'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <div id='app'>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </div>
  )
}

export default App
