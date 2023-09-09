import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { authSelector, resetAuthState } from '../../store/auth'
import { useEffect } from 'react'
import { resetQuery } from '../../store/consultation'

export function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id: userId } = useAppSelector(authSelector)

  useEffect(() => {
    if (userId === '') navigate('/signin')
  }, [])

  const handleLogout = () => {
    dispatch(resetAuthState())
    dispatch(resetQuery())
    navigate('/signin')
  }

  return (
    <div className="flex h-screen w-full select-none overflow-hidden">
      <nav className="flex w-24 flex-col items-center bg-white py-4">
        <div>
          <img className="h-20 w-20" src="money-tree.svg" />
        </div>

        <ul className="mt-2 capitalize text-gray-700">
          <li className="mt-3 rounded-lg p-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'flex flex-col items-center text-primary' : 'flex flex-col items-center'
              }
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
                          17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
                          8h-8v10h8V11m-10 4H3v6h8v-6z"
                ></path>
              </svg>
              <span className="mt-2 text-xs">dashBoard</span>
            </NavLink>
          </li>

          <li
            className="dark-hover:text-blue-300 mt-3 rounded-lg p-2
              hover:text-primary"
          >
            <NavLink
              to={'/conversations'}
              className={({ isActive }) =>
                isActive ? 'flex flex-col items-center text-primary' : 'flex flex-col items-center'
              }
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M23 3v-.5a2.5 2.5 0 00-5 0V3c-.55 0-1 .45-1 1v4c0
                          .55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1
                          0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V3M6
                          11h9v2H6v-2m0-4h9v2H6V7m16 4v5c0 1.11-.89 2-2 2H6l-4
                          4V4a2 2 0 012-2h11v2H4v13.17L5.17 16H20v-5h2z"
                ></path>
              </svg>
              <span className="mt-2 text-xs">Conversations</span>
            </NavLink>
          </li>
        </ul>
        <div className="mt-auto flex items-center rounded-full bg-primary p-2 text-white">
          <div onClick={handleLogout}>
            <svg
              className="h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 198.715 198.715"
            >
              <g>
                <path
                  d="M161.463,48.763c-2.929-2.929-7.677-2.929-10.607,0c-2.929,2.929-2.929,7.677,0,10.606
		c13.763,13.763,21.342,32.062,21.342,51.526c0,19.463-7.579,37.761-21.342,51.523c-14.203,14.204-32.857,21.305-51.516,21.303
		c-18.659-0.001-37.322-7.104-51.527-21.309c-28.405-28.405-28.402-74.625,0.005-103.032c2.929-2.929,2.929-7.678,0-10.606
		c-2.929-2.929-7.677-2.929-10.607,0C2.956,83.029,2.953,138.766,37.206,173.019c17.132,17.132,39.632,25.697,62.135,25.696
		c22.497-0.001,44.997-8.564,62.123-25.69c16.595-16.594,25.734-38.659,25.734-62.129C187.199,87.425,178.059,65.359,161.463,48.763
		z"
                />
                <path
                  d="M99.332,97.164c4.143,0,7.5-3.358,7.5-7.5V7.5c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v82.164
		C91.832,93.807,95.189,97.164,99.332,97.164z"
                />
              </g>
            </svg>
          </div>
        </div>
      </nav>
      <div></div>
      <main
        className="my-1 flex-1 overflow-y-auto rounded-l-lg bg-gray-200 px-10 pb-2 pt-2
      transition duration-500 ease-in-out"
      >
        <Outlet />
      </main>
    </div>
  )
}
