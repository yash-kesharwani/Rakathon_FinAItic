import { ChangeEvent, FormEvent, useState } from 'react'
import { useLazyRegisterQuery } from '../../store/auth'
import { Input, Select } from '../../components'
import moment from 'moment'

export default function Signup() {
  const [register] = useLazyRegisterQuery()
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    income: '',
    name: '',
    gender: '',
    dob: '',
    metro: '',
  })

  const hanleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register({ ...formValues, dob: moment(formValues.dob).valueOf() })
  }
  return (
    <div className="w-full bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-4xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register with Details
            </h1>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                  Name
                </label>
                <Input
                  value={formValues.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Raku roku"
                  required
                  onChange={hanleOnChange}
                />
              </div>
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
                  required
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
                  required
                  onChange={hanleOnChange}
                />
              </div>
              <div>
                <label htmlFor="income" className="mb-2 block text-sm font-medium text-gray-900">
                  Average Monthly Income
                </label>
                <Input
                  value={formValues.income}
                  type="number"
                  name="income"
                  id="income"
                  placeholder="10000"
                  required
                  onChange={hanleOnChange}
                />
              </div>

              <div>
                <label htmlFor="gender" className="mb-2 block text-sm font-medium text-gray-900">
                  Gender
                </label>

                <Select
                  id="gender"
                  size={3}
                  name="gender"
                  value={formValues.gender}
                  onChange={hanleOnChange}
                  required
                >
                  <option value={'male'}>Male</option>
                  <option value={'female'}>Female</option>
                  <option value={'others'}>Others</option>
                </Select>
              </div>
              <div>
                <label htmlFor="dob" className="mb-2 block text-sm font-medium text-gray-900">
                  Date of Birth
                </label>

                <Input
                  value={formValues.dob}
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="18/12/1995"
                  required
                  onChange={hanleOnChange}
                />
              </div>
              <div>
                <label htmlFor="metro" className="mb-2 block text-sm font-medium text-gray-900">
                  City Type
                </label>

                <Select
                  id="metro"
                  size={2}
                  name="metro"
                  value={formValues.metro}
                  onChange={hanleOnChange}
                  required
                >
                  <option value={'true'}>Metro city</option>
                  <option value={'false'}>Non Metro city</option>
                </Select>
              </div>
              <button
                type="submit"
                className="focus:ring-primary-300 col-span-2 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4"
              >
                Register
              </button>
              <p className="col-span-2 text-sm font-light text-gray-500">
                Already have an account?
                <span className="text-primary-600 ml-2 font-medium hover:underline">Login</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
