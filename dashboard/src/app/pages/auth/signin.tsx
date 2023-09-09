import { ChangeEvent, FormEvent, useState } from 'react'
import { setAuthState, useLazyLoginQuery } from '../../store/auth'
import { Input } from '../../components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import React from 'react'

export default function Signin() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login] = useLazyLoginQuery()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const hanleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(formValues).then(({ isSuccess, data }) => {
      if (isSuccess) {
        navigate('/')
        dispatch(setAuthState(data))
      }
    })
  }

  return (
    <div className="w-full bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <h1 className="mb-10 text-5xl">FinAItic</h1>
        <div className="relative w-full rounded-lg bg-white shadow sm:max-w-lg md:mt-0 xl:p-0">
          <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-primaryLight to-primaryBold shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div className="relative space-y-4 bg-white p-6 shadow-lg sm:rounded-lg sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                  Your email
                </label>
                <Input
                  value={formValues.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required={true}
                  onChange={hanleOnChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                  Password
                </label>
                <Input
                  value={formValues.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={hanleOnChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <Input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 h-4 w-4 rounded border bg-gray-50 focus:ring-primaryLight"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primaryLight"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?
                <NavLink
                  to={'/signup'}
                  className="text-primary-600 ml-2 font-medium text-primary hover:underline"
                >
                  Sign up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
