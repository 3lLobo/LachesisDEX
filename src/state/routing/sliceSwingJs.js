import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
// import { GetSwingQuoteResult, GetSwingSwapResult } from './types'
import ms from 'ms.macro'
import qs from 'qs'

export const swingApi = createApi({
  reducerPath: 'swingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swap.dev.swing.xyz/v0/transfer/',
  }),
  endpoints: (builder) => ({
    swingGetQuote: builder.query({
      query: (
        args
        // tokenAmount,
        // fromChain,
        // fromChainId,
        // fromTokenAddress,
        // fromUserAddress,
        // toChain,
        // toChainId,
        // tokenSymbol,
        // toTokenAddress,
        // toTokenSymbol,
        // toUserAddress,
      ) => {
        const query = qs.stringify(args)
        return `quote?${query}`
      },
      // keepUnusedDataFor: ms`10s`,
      // extraOptions: {
      //   maxRetries: 0,
      // },
    }),
    // swingGetAllowance: builder.query({
    //   query: (args) => {
    //     const query = qs.stringify(args);
    //     return `allowance?${query}`
    //   }
    // }),
    // swingGetApprove: builder.query({
    //   query: (args) => {
    //     const query = qs.stringify(args);
    //     return `approve?${query}`
    //   }
    // }),
    // swingPostSwap: builder.query({
    //   query: (args) => {
    //     const body = JSON.stringify(args);
    //     return {
    //       url: `send`,
    //       method: 'POST',
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body
    //     }
    //   }
    // }),
    // swingGetConfig: builder.query({
    //   query: () => {
    //     return `config`
    //   }
    // }),

  }),
})

export const {
  useSwingGetQuoteQuery,
  // useSwingGetAllowanceQuery,
  // useSwingGetApproveQuery,
  // useSwingPostSwapQuery,
  // useSwingGetConfigQuery
} = swingApi
