import React from 'react'
import { centerContentClass, genericButtonBlockSuccess } from 'theme/helperClasses'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const GenericButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button type="button" className={genericButtonBlockSuccess} {...props}>
      <div className={centerContentClass}>{children}</div>
    </button>
  )
}

export default GenericButton
