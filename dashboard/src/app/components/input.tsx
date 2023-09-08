import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export default function Input({
  className,
  ...otherProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 sm:text-sm ${className}`}
      {...otherProps}
    />
  )
}
