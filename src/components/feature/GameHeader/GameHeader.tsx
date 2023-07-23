import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { PropsWithChildren } from 'react'
import { winModeState } from '../../../lib/atoms/winModeState'
import styles from './GameHeader.module.css'

function GameHeader({children}: PropsWithChildren){
  const { gameStatus, winner } = useRecoilValue(gameState)
  const winMode = useRecoilValue(winModeState)

  return (
    <header>
      <h1>Lets Tic Tac Toe it out</h1>

      {gameStatus === 'active' && (
        <aside className={styles.dashboard}>
          <p><strong>Win:</strong> {winMode}</p>
          {children}
        </aside>
      )}

      {gameStatus === 'victory' && (
        <p className={styles.result}>Player {winner} wins!</p>  
      )}
    
      {gameStatus === 'draw' && (
        <p className={styles.result}>Draw!</p>
      )}
    </header>
  )
}

export default GameHeader
