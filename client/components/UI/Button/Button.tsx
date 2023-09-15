import { HtmlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'inline-flex items-center -center h-[70px] px-16 py-0 text-2xl font-semibold text-center text-orange no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-orange border-solid rounded-full cursor-pointer select-none hover:text-white hover:bg-orange hover:border-white focus:shadow-xs focus:no-underline">',

        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
