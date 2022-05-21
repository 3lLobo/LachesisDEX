import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { CHAIN_IDS_TO_NAMES, SupportedChainId } from 'constants/chains'
import { useMemo } from 'react'

/**
 * Returns query arguments for the Routing API query or undefined if the
 * query should be skipped. Input arguments do not need to be memoized, as they will
 * be destructured.
 */
export function useRoutingSwingAPIArguments({
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
