import { GridCellType, GridType } from '../../../lib/atoms/gridState'
import styles from './GameGrid.module.css'

export interface GameGridProps {
  grid: GridType
  onCellClick: (x: number, y: number) => void
}

function GameGrid({grid, onCellClick}: GameGridProps) {
  const cellClickHandler = (cellValue: GridCellType, x: number, y: number) => {
    if (cellValue !== null) return
    onCellClick(x, y)
  }

  return (
    <div className={styles.grid} role='grid' tabIndex={-1}>
      {grid.map((row, rowKey) => (
        <div className={styles.row} key={`row-${rowKey}`} tabIndex={-1}>
          {row.map((cellValue, colKey) => (
            <div 
              role='gridcell' 
              tabIndex={0} 
              className={`${styles.cell} ${cellValue === null ? styles.emptyCell : ''}`} 
              key={`cell-${rowKey}-${colKey}`} 
              onClick={() => cellClickHandler(cellValue, rowKey, colKey)}
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
