import { splitChartApi } from '../api'

export const authApi = splitChartApi.injectEndpoints({
  endpoints: (build) => ({
    getPieChart: build.query<any, any>({
      query() {
        return {
          url: `user/login`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetPieChartQuery } = authApi
