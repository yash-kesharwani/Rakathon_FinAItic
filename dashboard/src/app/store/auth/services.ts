import { splitApi } from '../api'

export const authApi = splitApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<any, any>({
      query({ email, password }) {
        return {
          url: `user/login?username=${email}&password=${password}`,
          method: 'POST',
        }
      },
    }),
    register: build.mutation<any, any>({
      query(body) {
        return {
          url: `user/register`,
          method: 'POST',
          body,
        }
      },
    }),
    uploadCSV: build.mutation<any, any>({
      query({ userId, formData }) {
        return {
          url: `transact/upload?user=${userId}`,
          method: 'POST',
          body: formData,
        }
      },
    }),
  }),
})

export const { useLazyLoginQuery, useRegisterMutation, useUploadCSVMutation } = authApi
