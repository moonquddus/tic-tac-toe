import { RecoilObserver, renderWithDefaultRecoil } from '../../../../lib/atoms/__helpers__/recoil'
import { RouterProvider } from 'react-router-dom'
import { router } from '../../../../lib/router'
import { fireEvent, screen, within } from '@testing-library/react'
import { gameModeState } from '../../../../lib/atoms/gameModeState'

describe('rendering from config', () => {
  it('should render all game mode options', () => {
    renderWithDefaultRecoil(<RouterProvider router={router} />)
    const { getByText } = within(screen.getByTestId('menu-gamemode'))
    expect(getByText('Single-player')).toBeDefined()
    expect(getByText('Multi-player')).toBeDefined()
  })

  it('should render all variations', () => {
    renderWithDefaultRecoil(<RouterProvider router={router} />)
    const { getByText } = within(screen.getByTestId('menu-variation'))
    expect(getByText('Standard')).toBeDefined()
    expect(getByText('Wild')).toBeDefined()
  })

  it('should render all win conditions', () => {
    renderWithDefaultRecoil(<RouterProvider router={router} />)
    const { getByText } = within(screen.getByTestId('menu-winmode'))
    expect(getByText('Standard')).toBeDefined()
    expect(getByText('Misere')).toBeDefined()
  })
})

describe('interacting with options', () => {
  it('should change game mode when you switch to multi-player', () => {
    const onChange = jest.fn()
    renderWithDefaultRecoil(
      <>
        <RecoilObserver node={gameModeState} onChange={onChange} />
        <RouterProvider router={router}/>
      </>
    )

    const { getByTestId } = within(screen.getByTestId('menu-gamemode'))
    const multiplayerOption = getByTestId('option-multi-player')
    
    fireEvent.click(multiplayerOption)
    expect(onChange).toHaveBeenCalledWith('multi-player')
  })
})
