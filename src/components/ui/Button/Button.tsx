import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from './Button.module.css'

/**
 * There is plenty more I can do here
 * eg. more themes, sizes, a disabled state, etc
 */

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variation?: 'primary' | 'secondary'
}

function Button(props: ButtonProps) {
  const {children, className, variation = 'primary', ...data} = props
  return (
    <button {...data} className={`${styles.button} ${className}`} data-variation={variation}>
      {children}
    </button>
  )
}

export default Button
