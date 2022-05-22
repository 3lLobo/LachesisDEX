import { BigNumber } from '@ethersproject/bignumber'
import { SwapRouter, Trade } from '@uniswap/router-sdk'
import { Currency, CurrencyAmount, Percent, TradeType } from '@uniswap/sdk-core'
import { Router as V2SwapRouter, Trade as V2Trade } from '@uniswap/v2-sdk'
import { FeeOptions, SwapRouter as V3SwapRouter, Trade as V3Trade } from '@uniswap/v3-sdk'
import { SWAP_ROUTER_ADDRESSES, V3_ROUTER_ADDRESS } from 'constants/addresses'
import { CHAIN_IDS_TO_NAMES, SupportedChainId } from 'constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'

export type AnyTrade =
  | V2Trade<Currency, Currency, TradeType>
  | V3Trade<Currency, Currency, TradeType>
  | Trade<Currency, Currency, TradeType>

interface SwapCall {
  address: string
  calldata: string
  value: string
}

export function useSwingSwapCallArguments({
  tokenIn,
  tokenOut,
  fromUserAddress,
  amount,
  toUserAddress,
}: {
  tokenIn: Currency | undefined
  tokenOut: Currency | undefined
  fromUserAddress: string | undefined
  amount: CurrencyAmount<Currency> | undefined
  toUserAddress: string | undefined
}) {
  return useMemo(
    () =>
      !tokenIn || !tokenOut || !amount || !fromUserAddress
        ? undefined
        : {
            tokenAmount: amount.quotient.toString(),
            fromChain: CHAIN_IDS_TO_NAMES[tokenIn.wrapped.chainId as SupportedChainId],
            fromChainId: tokenIn.wrapped.chainId,
            fromTokenAddress: tokenIn.wrapped.address,
            fromUserAddress: fromUserAddress,
            toChain: CHAIN_IDS_TO_NAMES[tokenOut.wrapped.chainId as SupportedChainId],
            toChainId: tokenOut.wrapped.chainId,
            tokenSymbol: tokenIn.wrapped.symbol,
            toTokenAddress: tokenOut.wrapped.address,
            toTokenSymbol: tokenOut.wrapped.symbol,
            toUserAddress: toUserAddress,
          },
    [amount, tokenIn, tokenOut, fromUserAddress, toUserAddress]
  )
}
