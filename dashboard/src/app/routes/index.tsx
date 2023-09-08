import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ErrorPage from '../templates/error-page'
import App from '../../App'
import Signin from '../pages/auth/signin'

const routes = [
  {
    index: true,
    path: '/signin',
    element: <Signin />,
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
