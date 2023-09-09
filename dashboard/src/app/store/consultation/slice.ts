import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const reducerPath = 'consultation'

export type IntialState = { question?: string; answer?: string }[]

const initialState: IntialState = []

export const consultationSlice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {
    addQuestion: (prevState, { payload }) => {
      return [...prevState, { question: payload, time: moment().calendar() }]
    },
    addAnswer: (prevState, { payload }) => {
      return [...prevState, { answer: payload, time: moment().calendar() }]
    },
    resetQuery: () => {
      return []
    },
  },
})

export const { addQuestion, addAnswer, resetQuery } = consultationSlice.actions
