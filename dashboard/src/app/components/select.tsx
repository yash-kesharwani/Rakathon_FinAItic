import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export default function Select({
  className,
  children,
  ...otherProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
  return (
    <select
      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${className}`}
      {...otherProps}
    >
      {children}
    </select>
  )
}
