import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export default function Select({
  className,
  children,
  ...otherProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
  return (
    <select
      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 accent-primary outline-primaryLight focus:border-primaryLight focus:outline-none focus:ring-primaryLight ${className}`}
      {...otherProps}
    >
      {children}
    </select>
  )
}
