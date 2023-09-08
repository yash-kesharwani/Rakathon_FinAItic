import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ErrorPage from '../templates/error-page'
import App from '../../App'
import Signin from '../pages/auth/signin'
import Signup from '../pages/auth/signup'
import { Dashboard } from '../pages/dashboard'
import View from '../pages/dashboard/view'
import Conversation from '../pages/dashboard/conversation'

const routes = [
  {
    index: true,
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <View />,
      },
      {
        path: 'conversations',
        element: <Conversation />,
      },
    ],
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
