import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { GetSwingQuoteResult } from './types'
import ms from 'ms.macro'
import qs from 'qs'

export const routingSwingApi = createApi({
  reducerPath: 'routingSwingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swap.dev.swing.xyz/v0/transfer/',
  }),
  endpoints: (build) => ({
    swingGetQuote: build.query<
      GetSwingQuoteResult,
      {
        tokenAmount: string
        fromChain: string
        fromChainId: number
        fromTokenAddress: string
        fromUserAddress: string
        toChain: string
        toChainId: number
        tokenSymbol: string | undefined
        toTokenAddress: string
        toTokenSymbol: string | undefined
        toUserAddress: string | undefined
      }
    >({
      async queryFn(args, _api, _extraOptions, fetch) {
        const {
          tokenAmount,
          fromChain,
          fromChainId,
          fromTokenAddress,
          fromUserAddress,
          toChain,
          toChainId,
          tokenSymbol,
          toTokenAddress,
          toTokenSymbol,
          toUserAddress,
        } = args

        let result

        try {
          const query = qs.stringify({
            tokenAmount,
            fromChain,
            fromChainId,
            fromTokenAddress,
            fromUserAddress,
            toChain,
            toChainId,
            tokenSymbol,
            toTokenAddress,
            toTokenSymbol,
            toUserAddress,
          })
          result = await fetch(`quote?${query}`)

          return { data: result.data as GetSwingQuoteResult }
        } catch (e) {
          // TODO: fall back to client-side quoter when auto router fails.
          return { error: e as FetchBaseQueryError }
        }
      },
      keepUnusedDataFor: ms`10s`,
      extraOptions: {
        maxRetries: 0,
      },
    }),
  }),
})

export const { useSwingGetQuoteQuery } = routingSwingApi
