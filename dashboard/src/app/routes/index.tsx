import { createBrowserRouter,RouteObject } from 'react-router-dom'
import ErrorPage from '../templates/error-page'
import App from '../../App'

export const appRoutes: RouteObject[] = [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [],
    },
  ]
  

export const router = createBrowserRouter(appRoutes)

