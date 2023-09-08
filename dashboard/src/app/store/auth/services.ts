import { splitApi } from '../api'

export const authApi = splitApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<any, any>({
      query({ username, password }) {
        return {
          url: `/signin`,
          method: 'POST',
          body: { username, password },
        }
      },
    }),
    logout: build.query({
      query() {
        return {
          url: `/signout`,
          method: 'POST',
        }
      },
    }),
  }),
})

export const { useLazyLoginQuery, useLazyLogoutQuery } = authApi
