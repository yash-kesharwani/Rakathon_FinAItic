import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API_URL = `${process.env.REACT_APP_API_URL}/api/`
export const CHART_URL = `${process.env.REACT_APP_CHART_URL}/`

// create a new mutex
// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
})

const baseChartQuery = fetchBaseQuery({
  baseUrl: CHART_URL,
})

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
  baseQuery: baseQuery,
  endpoints: () => ({}),
})

export const splitChartApi = createApi({
  reducerPath: 'splitChartApi',
  keepUnusedDataFor: 300,
  refetchOnReconnect: true,
  baseQuery: baseChartQuery,
  endpoints: () => ({}),
})
