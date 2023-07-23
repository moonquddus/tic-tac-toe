import { RouterProvider } from 'react-router-dom'
import { router } from '../../../lib/router'
import styles from './App.module.css'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <main id='app' className={styles.app}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </main>
  )
}

export default App
