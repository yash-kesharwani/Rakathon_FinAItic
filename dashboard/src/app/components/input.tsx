import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export default function Input({
  className,
  ...otherProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className={`block w-full rounded-lg border bg-gray-50 p-2.5 accent-primary focus:border-primaryBold focus:outline-none focus:ring-primaryBold sm:text-sm ${className}`}
      {...otherProps}
    />
  )
}
