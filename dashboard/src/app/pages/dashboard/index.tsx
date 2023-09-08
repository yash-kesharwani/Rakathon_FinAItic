import { NavLink, Outlet } from 'react-router-dom'

export function Dashboard() {
  return (
    <div className="flex h-screen w-full select-none overflow-hidden">
      <nav className="flex w-24 flex-col items-center bg-white py-4">
        <div>
          <svg className="h-8 w-8 fill-current text-primary" viewBox="0 0 24 24">
            <path
              d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82
                  6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12
                  15l5-2.73V16z"
            ></path>
          </svg>
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
      </nav>
      <main
        className="my-1 flex-1 overflow-y-auto rounded-l-lg bg-gray-200 px-10 pb-2 pt-2
      transition duration-500 ease-in-out"
      >
        <Outlet />
      </main>
    </div>
  )
}
