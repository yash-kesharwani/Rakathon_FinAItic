/** Creating Auth Context to handle User Authentication */
import * as React from 'react'
import { useLocalStorage } from './useLocalStorage'
import { AuthContextType } from './types'

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>('isLoggedIn', false)

  const login = React.useCallback(
    (cb?: () => void) => {
      setIsLoggedIn(true)
      cb?.()
    },
    [setIsLoggedIn]
  )

  const logout = React.useCallback(
    (cb?: () => void) => {
      setIsLoggedIn(false)
      cb?.()
    },
    [setIsLoggedIn]
  )

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
