import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ErrorPage from '../templates/error-page'
import App from '../../App'
import Signin from '../pages/auth/signin'
import Signup from '../pages/auth/signup'

const routes = [
  {
    index: true,
    path: '/signin',
    element: <Signin />,
  },
  {
    index: true,
    path: '/signup',
    element: <Signup />,
  },
]

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: routes,
  },
]

export const router = createBrowserRouter(appRoutes)
