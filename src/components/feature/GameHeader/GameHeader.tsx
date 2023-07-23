import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { PropsWithChildren, useMemo } from 'react'
import { winModeState } from '../../../lib/atoms/winModeState'
import styles from './GameHeader.module.css'
import { gameModeState } from '../../../lib/atoms/gameModeState'
import { getPlayerName } from '../../../lib/utility/gameUtils'

function GameHeader({children}: PropsWithChildren){
  const { gameStatus, winner } = useRecoilValue(gameState)
  const gameMode = useRecoilValue(gameModeState)
  const winMode = useRecoilValue(winModeState)

  const winningPlayer = useMemo(() => {
    if (winner === null) return null
    return getPlayerName(winner, gameMode)
  }, [winner, gameMode])

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
        <p className={styles.result}>{winningPlayer} wins!</p>  
      )}
    
      {gameStatus === 'draw' && (
        <p className={styles.result}>Draw!</p>
      )}
    </header>
  )
}

export default GameHeader
