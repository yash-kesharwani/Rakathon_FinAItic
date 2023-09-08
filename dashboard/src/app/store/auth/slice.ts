import { createSlice } from '@reduxjs/toolkit'
import { UserIntialState } from './types'

export const reducerPath = 'login'

const initialState: UserIntialState = {
  username: '',
  password: '',
  email: '',
  userId: '',
  isLoading: false,
}

export const authSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {
    changeLoginInputValue: (prevState, { payload }) => {
      return {
        ...prevState,
        [payload.type]: payload.value,
      }
    },
  },
  extraReducers: (builder) => {},
})

export const { changeLoginInputValue } = authSlice.actions
