import { splitModelApi } from '../api'

export const authApi = splitModelApi.injectEndpoints({
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
    generateFile: build.query<any, any>({
      query(userId) {
        return {
          url: `get_user_id/${userId}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetAnswersMutation, useLazyGenerateFileQuery } = authApi
