import { render, screen } from '@testing-library/react'
import App from '../App'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('rendering root page', () => {
  it('should render the menu page initially', () => {
    render(<App />)
    expect(screen.getByText(/Tic Tac Toe: Moon Edition/i)).toBeInTheDocument()
  })
})
