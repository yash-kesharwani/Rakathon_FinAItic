import { act, render } from '@testing-library/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './error-page'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
])

describe('Error page', () => {
  it('should show error page when user goes to invalid route', () => {
    render(<RouterProvider router={routes} />)
    act(() => {
      window.location.href = '/some-route'
    })
  })
})
