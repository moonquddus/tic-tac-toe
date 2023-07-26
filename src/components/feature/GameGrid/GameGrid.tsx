import { useRecoilValue } from 'recoil'
import { GridCellType, GridType } from '../../../lib/atoms/gridState'
import styles from './GameGrid.module.css'
import { KeyboardEvent, useCallback, useMemo } from 'react'
import { gameState } from '../../../lib/atoms/gameState'

export interface GameGridProps {
  grid: GridType
  onCellClick: (x: number, y: number) => void
}

function GameGrid({grid, onCellClick, ...data}: GameGridProps) {
  // this is for highlighting a winning combo
  // one limitation: it doesn't highlight each combo if you managed to get 2 three-in-a-rows
  const { completingLine } = useRecoilValue(gameState)

  const winningCoordinates = useMemo(() => {
    if (completingLine === null) return []

    switch(completingLine.direction){
    case 'row':
      return grid.map((_, index) => ([completingLine.position, index]))
    case 'col':
      return grid.map((_, index) => ([index, completingLine.position]))
    case 'diag':
      return grid.map((_, index) => ([index, index]))
    case 'anti-diag':
      return grid.map((_, index) => ([index, (grid.length - 1) - index]))
    default:
      return []
    }
  }, [completingLine])

  const isWinningCoordinate = useCallback((row: number, col: number): boolean => {
    if (winningCoordinates.length === 0) return false

    return winningCoordinates.some(([x, y]) => x === row && y === col)
  }, [winningCoordinates])

  type ClickHandlerArgs = [
    GridCellType, 
    number, 
    number
  ]
  const cellClickHandler: (...args: ClickHandlerArgs) => void = (cellValue, x, y) => {
    if (cellValue !== null) return
    onCellClick(x, y)
  }
  const cellKeyHandler = (event: KeyboardEvent<HTMLDivElement>, ...args: ClickHandlerArgs) => {
    // Make it a11y-friendly - support Enter & Space
    // TODO: support arrow keys to move around the grid instead of having to tab though each one
    event.preventDefault()
    if (['Enter', ' '].includes(event.key))
      cellClickHandler(...args)
  }

  return (
    <div className={styles.grid} role='grid' tabIndex={-1} {...data}>
      {grid.map((row, rowKey) => (
        <div role='row' aria-rowindex={rowKey} className={styles.row} key={`row-${rowKey}`} tabIndex={-1}>
          {row.map((cellValue, colKey) => (
            <div 
              role='gridcell'
              aria-rowindex={rowKey}
              aria-colindex={colKey}
              data-testid='grid-cell'
              tabIndex={0} 
              className={`${styles.cell} ${cellValue === null ? styles.emptyCell : ''} ${isWinningCoordinate(rowKey, colKey) ? styles.winningCell : ''}`} 
              key={`cell-${rowKey}-${colKey}`} 
              onClick={() => cellClickHandler(cellValue, rowKey, colKey)}
              onKeyUp={(event) => cellKeyHandler(event, cellValue, rowKey, colKey)}
            >
              {cellValue ?? ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameGrid
