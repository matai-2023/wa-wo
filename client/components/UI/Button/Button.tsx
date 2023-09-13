import { HtmlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-orange no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-orange border-solid rounded-full cursor-pointer select-none hover:text-white hover:bg-orange hover:border-white focus:shadow-xs focus:no-underline">',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button