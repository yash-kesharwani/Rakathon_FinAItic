import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

export const API_URL = `${process.env.REACT_APP_API_URL}/api/`

// create a new mutex
// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const splitApi = createApi({
  reducerPath: 'splitApi',
  keepUnusedDataFor: 300,
  refetchOnReconnect: true,
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
})
