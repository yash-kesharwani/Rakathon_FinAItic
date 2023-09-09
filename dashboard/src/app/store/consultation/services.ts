import { splitChartApi } from '../api'

export const authApi = splitChartApi.injectEndpoints({
  endpoints: (build) => ({
    getAnswers: build.mutation<any, any>({
      query(question) {
        return {
          url: `get_response`,
          method: 'POST',
          body: {
            question,
          },
        }
      },
    }),
  }),
})

export const { useGetAnswersMutation } = authApi
