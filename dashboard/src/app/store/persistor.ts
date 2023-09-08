import { AnyAction, Reducer, combineReducers, createAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { authSlice } from './auth'
import { RootState } from '.'
import { splitApi } from './api'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [], // This will not be persisted
}

const combinedReducer = combineReducers({
  [splitApi.reducerPath]: splitApi.reducer,
  [authSlice.name]: authSlice.reducer,
})

export const resetAllState = createAction('root/resetAll')

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === resetAllState.type) {
    state = undefined
  }
  return combinedReducer(state, action)
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
