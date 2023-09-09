import { RootState } from '..'
import { reducerPath } from './slice'

export const authSelector = (state: RootState) => state[reducerPath]
