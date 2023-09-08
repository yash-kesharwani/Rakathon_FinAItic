import { Outlet } from 'react-router-dom'
import { AuthProvider } from './app/hooks'

export const APP_TEST_ID = 'APP_TEST_ID'

export default function App() {
  return (
    <AuthProvider>
      <div
        className="flex h-screen overflow-hidden font-Nezto antialiased"
        data-testid={APP_TEST_ID}
      >
        <div className="relative flex flex-1 flex-col">
          {/* Content area */}
          <main className="max-w-9xl flex w-full flex-grow">
            <p>FinAItic</p>
            <Outlet />
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}
