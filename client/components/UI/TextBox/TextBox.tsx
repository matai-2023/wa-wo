import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputAttribues = InputHTMLAttributes<HTMLInputElement>

function TextBox({ className, ...rest }: InputAttribues) {
  return (
    <input
      type="text"
      className={twMerge(
        'text-black w-[200px] md:w-[300px] mb-10 p-4 text:md md:text-2xl outline-orange',
        className
      )}
      autoComplete="off"
      {...rest}
    />
  )
}

export default TextBox
