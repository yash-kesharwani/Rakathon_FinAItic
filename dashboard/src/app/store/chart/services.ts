import { splitChartApi } from '../api'

export const authApi = splitChartApi.injectEndpoints({
  endpoints: (build) => ({
    getIncomeChart: build.query<any, any>({
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
    getExpenseChart: build.query<any, any>({
      query(userId) {
        return {
          url: `expense_category_avg`,
          method: 'POST',
          body: {
            user_id: userId,
          },
        }
      },
    }),
  }),
})

export const { useLazyGetIncomeChartQuery, useLazyGetExpenseChartQuery } = authApi
