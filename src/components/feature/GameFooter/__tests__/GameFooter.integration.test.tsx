import { MutableSnapshot, RecoilRoot } from 'recoil'
import { createWinnableGridForCrosses } from '../../../../lib/utility/__fixtures__/grid.fixtures'
import { gridState } from '../../../../lib/atoms/gridState'
import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilObserver } from '../../../../lib/atoms/__helpers__/recoil'
import GameFooter from '../GameFooter'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('footer buttons', () => {
  it('should reset the game to default when you click on restart', () => {
    const grid = createWinnableGridForCrosses()
    const onChange = jest.fn()

    const initializeState = ({set}: MutableSnapshot) => {
      set(gridState, grid)
    }
    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={gridState} onChange={onChange} />
        <RouterProvider router={mockRouter()} />
      </RecoilRoot>
    )
    const resetButton = screen.getByTestId('reset-button')
    
    fireEvent.click(resetButton)
    expect(onChange).toHaveBeenCalledWith([
      [null, null, null], 
      [null, null, null], 
      [null, null, null]
    ])
  })
})

function mockRouter(){
  return createMemoryRouter([
    {
      path: '/',
      element: <GameFooter />,
    },
  ]) 
}
