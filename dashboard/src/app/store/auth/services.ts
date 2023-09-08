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
    register: build.query<any, any>({
      query(body) {
        return {
          url: `user/register`,
          method: 'POST',
          body,
        }
      },
    }),
    uploadCSV: build.query<any, any>({
      query({ userId, formData }) {
        return {
          url: `transact/upload?user=${userId}`,
          method: 'POST',
          headers: { 'content-type': 'multipart/form-data' },
          body: formData,
        }
      },
    }),
  }),
})

export const { useLazyLoginQuery, useLazyRegisterQuery, useLazyUploadCSVQuery } = authApi
