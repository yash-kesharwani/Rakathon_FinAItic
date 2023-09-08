export interface UserType {
  id: string
  username: string
  email: string
  roles: string[]
  hasSources: boolean
}

export interface AuthContextType {
  isLoggedIn: boolean
  login: (cb?: () => void) => void
  logout: (cb?: () => void) => void
}
