import { HtmlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'w-auto bg-primary text-white py-2 px-4 rounded-lg hover:shadow-[0px_0px_9px_2px_#FF17CE]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
