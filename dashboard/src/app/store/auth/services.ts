import { splitApi } from '../api'

export const authApi = splitApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<any, any>({
      query({ username, password }) {
        return {
          url: `user/login`,
          method: 'POST',
          body: { username, password },
        }
      },
    }),
    register: build.query<any, any>({
      query(body) {
        return {
          url: `user/register`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useLazyLoginQuery, useLazyRegisterQuery } = authApi
