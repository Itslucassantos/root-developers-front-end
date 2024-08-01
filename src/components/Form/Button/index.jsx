import React from 'react'
import style from './Button.module.css'

const Button = ({ children, onClick, differentButton, type, disabled }) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={`${differentButton ? `btn btn-outline-light px-4 py-2 ${style.buttonCustom}` : style.buttonLogin} ${disabled ? style.buttonDisabled : ''}`}>{children}</button>
  )
}

export default Button