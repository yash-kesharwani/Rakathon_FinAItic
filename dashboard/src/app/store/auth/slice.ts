import { createSlice } from '@reduxjs/toolkit'
import { UserIntialState } from './types'

export const reducerPath = 'login'

const initialState: UserIntialState = {
  username: '',
  password: '',
  email: '',
  id: '',
  isLoading: false,
  name: '',
  dob: 0,
  gender: '',
  income: 0,
  metro: false,
}

export const authSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {
    setAuthState: (prevState, { payload }) => {
      return {
        ...prevState,
        ...payload,
      }
    },
  },
  extraReducers: (builder) => {},
})

export const { setAuthState } = authSlice.actions
