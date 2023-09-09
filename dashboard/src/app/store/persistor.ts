import { AnyAction, Reducer, combineReducers, createAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { authSlice } from './auth'
import { RootState } from '.'
import { splitApi, splitChartApi, splitModelApi } from './api'
import { consultationSlice } from './consultation'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [], // This will not be persisted
}

const combinedReducer = combineReducers({
  [splitApi.reducerPath]: splitApi.reducer,
  [splitChartApi.reducerPath]: splitChartApi.reducer,
  [splitModelApi.reducerPath]: splitModelApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [consultationSlice.name]: consultationSlice.reducer,
})

export const resetAllState = createAction('root/resetAll')

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === resetAllState.type) {
    state = undefined
  }
  return combinedReducer(state, action)
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
