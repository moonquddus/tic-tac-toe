import { render } from '@testing-library/react'
import Button from '../Button'

describe('Button label', () => {
  it('should render children as Button text', () => {
    const wrapper = render(<Button>Hello I am a button</Button>)
    expect(wrapper.baseElement).toMatchSnapshot()
  })
})

describe('Variations', () => {
  it('should render a primary button', () => {
    const wrapper = render(<Button variation='primary'>Primary button</Button>)
    expect(wrapper.baseElement).toMatchSnapshot()
  })

  it('should render a secondary button', () => {
    const wrapper = render(<Button variation='secondary'>Secondary button</Button>)
    expect(wrapper.baseElement).toMatchSnapshot()
  })
})
