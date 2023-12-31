import { configureStore, ThunkAction, Action, PreloadedState } from '@reduxjs/toolkit'
import { persistedReducer, rootReducer } from './persistor'
import persistStore from 'redux-persist/es/persistStore'
import { splitApi, splitChartApi, splitModelApi } from './api'

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      splitApi.middleware,
      splitChartApi.middleware,
      splitModelApi.middleware,
    ]),
})
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export { resetAllState } from './persistor'
