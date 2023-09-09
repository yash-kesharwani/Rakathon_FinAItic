import { RootState } from '..'
import { reducerPath } from './slice'

export const consultationSelector = (state: RootState) => state[reducerPath]
