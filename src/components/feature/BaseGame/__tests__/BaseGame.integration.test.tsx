import { fireEvent, render, screen, within } from '@testing-library/react'
import { RecoilObserver, renderWithDefaultRecoil } from '../../../../lib/atoms/__helpers__/recoil'
import { gridState } from '../../../../lib/atoms/gridState'
import BaseGame from '../BaseGame'
import { TIC_TAC_TOE_SYMBOL } from '../../../../lib/model'
import { createTurnAction } from '../__fixtures__/turn'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { createDrawnGrid, createEmptyGrid, createWinnableGridForCrosses, createWinnableGridForNoughts } from '../../../../lib/utility/__fixtures__/grid.fixtures'
import { useComputerPlayer } from '../../../../lib/hooks/useComputerPlayer'
import { gameState } from '../../../../lib/atoms/gameState'
import { gameModeState } from '../../../../lib/atoms/gameModeState'
import { createGameState } from '../../../../lib/utility/__fixtures__/game.fixtures'
import { winModeState } from '../../../../lib/atoms/winModeState'

const {NOUGHT, CROSS} = TIC_TAC_TOE_SYMBOL

describe('playing turns on the grid', () => {
  it('should place down a symbol on the grid when you make a move', () => {
    const onChange = jest.fn()
    renderWithDefaultRecoil(
      <>
        <RecoilObserver node={gridState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={() => createTurnAction(0, 0, CROSS)} />
      </>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[5])
    expect(onChange).toHaveBeenCalledWith([[null, null, null], [null, null, NOUGHT], [null, null, null]])
  })

  it('should not let you put down a symbol on a populated grid cell', () => {
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      const grid = createEmptyGrid()
      grid[1][2] = NOUGHT
      set(gridState, grid)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gridState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={() => createTurnAction(0, 0, CROSS)} />
      </RecoilRoot>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[5])
    // onchange already happened in init
    // we need to make sure it doesn't happen again
    expect(onChange).toHaveBeenNthCalledWith(1, [[null, null, null], [null, null, NOUGHT], [null, null, null]])
    expect(onChange).not.toHaveBeenNthCalledWith(2, [[null, null, null], [null, null, NOUGHT], [null, null, null]])
  })

  it('should automatically put down a marker when its single player and not your turn', () => {
    const grid = createEmptyGrid()
    grid[1][2] = NOUGHT
    const makeComputerTurn = useComputerPlayer(grid, [CROSS], 'standard')

    const onChange = jest.fn()
    renderWithDefaultRecoil(
      <>
        <RecoilObserver node={gridState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={makeComputerTurn} />
      </>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[5])
    expect(onChange).toBeCalledTimes(3) // Third time should be automatic cpu
    expect(onChange).not.toHaveBeenNthCalledWith(3, [[null, null, null], [null, null, NOUGHT], [null, null, null]])
  })
})

describe('winning the game', () => {
  it('should declare a winner when a three-in-a-row is put down', () => {
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      const grid = createWinnableGridForCrosses()
      set(gameModeState, 'multi-player')
      set(gridState, grid)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gameState} onChange={onChange} />
        <BaseGame symbol={CROSS} onComputerTurn={() => createTurnAction(0, 0, CROSS)} />
      </RecoilRoot>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[3])
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      gameStatus: 'victory',
    }))
  })

  it('should declare a draw when the entire grid is populated without three-in-a-row', () => {
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      const grid = createDrawnGrid()
      grid[0][0] = null
      set(gridState, grid)

      const game = createGameState({ turn: 9 })
      set(gameState, game)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gameState} onChange={onChange} />
        <BaseGame symbol={CROSS} onComputerTurn={() => createTurnAction(0, 0, CROSS)} />
      </RecoilRoot>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[0])
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      gameStatus: 'draw',
    }))
  })

  it('should declare player 1 the winner when you get three-in-a-row', () => {
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      const grid = createWinnableGridForNoughts()
      const game = createGameState({
        turn: 6
      })
      set(gameModeState, 'multi-player')
      set(gridState, grid)
      set(gameState, game)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gameState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={() => createTurnAction(0, 0, CROSS)} />
      </RecoilRoot>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[8])
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      winner: 1,
    }))
  })

  it('should declare player 2 the winner when you get three-in-a-row in misere', () => {
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      const grid = createWinnableGridForNoughts()
      const game = createGameState({
        turn: 6
      })
      set(gameModeState, 'multi-player')
      set(gridState, grid)
      set(gameState, game)
      set(winModeState, 'misere')
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gameState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={() => createTurnAction(0, 0, CROSS)} />
      </RecoilRoot>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[8])
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      winner: 2,
    }))
  })
})

describe('smart computer moves', () => {
  it('should play a winning move when one exists', () => {
    const grid = createWinnableGridForCrosses()
    const makeComputerTurn = useComputerPlayer(grid, [CROSS], 'standard')
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      set(gridState, grid)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gameState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={makeComputerTurn} />
      </RecoilRoot>
    )
    const { getAllByTestId } = within(screen.getByTestId('game-grid'))
    const gridCell = getAllByTestId('grid-cell')
    
    fireEvent.click(gridCell[6])
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      gameStatus: 'victory',
      winner: 2,
    }))
  })

  it('should play a defensive mode to prevent player 1 from winning', () => {
    const grid = createWinnableGridForNoughts()
    const makeComputerTurn = useComputerPlayer(grid, [CROSS], 'standard')
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      set(gridState, grid)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gridState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={makeComputerTurn} />
      </RecoilRoot>
    )
    // Bottom right should be a cross to prevent the win
    expect(onChange).toHaveBeenCalledWith([
      [NOUGHT, null, null],
      [null, NOUGHT, CROSS],
      [null, CROSS, CROSS],
    ])
  })

  it('should prevent itself from getting three-in-a-row in misere mode', () => {
    const grid = createWinnableGridForCrosses()
    const makeComputerTurn = useComputerPlayer(grid, [CROSS], 'standard')
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      set(gridState, grid)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gridState} onChange={onChange} />
        <BaseGame symbol={NOUGHT} onComputerTurn={makeComputerTurn} />
      </RecoilRoot>
    )
    // Middle-left should NOT be a cross, else CPU would lose
    expect(onChange).not.toHaveBeenCalledWith([
      [NOUGHT, null, null],
      [CROSS, CROSS, CROSS],
      [null, CROSS, null],
    ])
  })
})
