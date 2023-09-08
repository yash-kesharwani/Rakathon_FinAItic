import { splitChartApi } from '../api'

export const authApi = splitChartApi.injectEndpoints({
  endpoints: (build) => ({
    getPieChart: build.query<any, any>({
      query(userId) {
        return {
          url: `income_category_avg`,
          method: 'POST',
          body: {
            user_id: userId,
          },
        }
      },
    }),
  }),
})

export const { useGetPieChartQuery } = authApi
