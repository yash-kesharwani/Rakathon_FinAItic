import { createSlice } from '@reduxjs/toolkit'
import { UserIntialState } from './types'

export const reducerPath = 'login'

const initialState: UserIntialState = {
  username: '',
  password: '',
  email: '',
  id: '3ad4356f-91c6-469a-a0ba-1f26bd78fd29',
  isLoading: false,
  name: '',
  dob: 0,
  gender: '',
  income: 0,
  metro: false,
  isDataAvailable: true,
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
