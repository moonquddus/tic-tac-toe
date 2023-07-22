import styles from './Grid.module.css'

export interface GridProps {
  size?: number
}

function Grid({size = 3}: GridProps) {
  const iterator = new Array(size).fill(null)
  return (
    <div className={styles.grid}>
      {iterator.map((_, rowKey) => (
        <div className={styles.row} key={`row-${rowKey}`}>
          {iterator.map((_, colKey) => (
            <div className={styles.cell} key={`cell-${rowKey}-${colKey}`}>X</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Grid
