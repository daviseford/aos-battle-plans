import React from 'react'
import { centerContentClass, genericButtonBlock } from 'theme/helperClasses'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const GenericButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button type="button" className={genericButtonBlock} {...props}>
      <div className={centerContentClass}>{children}</div>
    </button>
  )
}

export default GenericButton
