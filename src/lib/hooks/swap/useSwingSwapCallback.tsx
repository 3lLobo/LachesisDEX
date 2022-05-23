// eslint-disable-next-line no-restricted-imports

// UNUSED, merged with hooks/useSwapCall.tsx
import { skipToken } from '@reduxjs/toolkit/query/react'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { Trans } from '@lingui/macro'
import { Currency, CurrencyAmount, NativeCurrency, Percent, Token } from '@uniswap/sdk-core'
import { FeeOptions } from '@uniswap/v3-sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useENS from 'hooks/useENS'
import { SignatureData } from 'hooks/useERC20Permit'
import { AnyTrade, useSwapCallArguments } from 'hooks/useSwapCallArguments'
import { useSwingSwapCallArguments } from 'hooks/useSwingSwapCallArguments'
import ms from 'ms.macro'
import { ReactNode, useMemo } from 'react'

import useSendSwapTransaction from './useSendSwapTransaction'
import { useSwingSwapQuery } from 'state/routing/sliceSwing'
import { GetSwingQuoteResult, GetSwingSwapResult } from 'state/routing/types'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

interface UseSwingSwapCallbackReturns {
  isLoading: boolean
  isError: boolean
  data: GetSwingSwapResult | undefined
  currentData: GetSwingSwapResult | undefined
  error: FetchBaseQueryError | SerializedError | undefined
}
interface UseSwingSwapCallbackArgs {
  trade: AnyTrade | undefined // trade to execute, required
  allowedSlippage: Percent // in bips
  recipientAddressOrName: string | null | undefined // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  signatureData: SignatureData | null | undefined
  deadline: BigNumber | undefined
  feeOptions?: FeeOptions
  amount: CurrencyAmount<NativeCurrency | Token> | undefined
  amountSpecified?: CurrencyAmount<Currency>
  otherCurrency?: Currency
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwingSwapCallback({
  trade,
  allowedSlippage,
  recipientAddressOrName,
  signatureData,
  deadline,
  feeOptions,
  amount,
  amountSpecified,
  otherCurrency,
}: UseSwingSwapCallbackArgs): UseSwingSwapCallbackReturns {
  const [currencyIn, currencyOut]: [Currency | undefined, Currency | undefined] = useMemo(
    () => [amountSpecified?.currency, otherCurrency],
    [amountSpecified, otherCurrency]
  )

  const { account, chainId, library } = useActiveWeb3React()
  const swapCalls = useSwingSwapCallArguments({
    tokenIn: currencyIn,
    tokenOut: currencyOut,
    amount: amountSpecified,
    fromUserAddress: account ?? undefined,
    toUserAddress: account ?? undefined,
  })

  const { isLoading, isError, data, currentData, error } = useSwingSwapQuery(swapCalls ?? skipToken, {
    pollingInterval: 15000,
    refetchOnFocus: true,
  })

  // const quoteResult: GetSwingQuoteResult | undefined = useIsValidBlock(Number(data?.blockNumber) || 0)
  //   ? data
  //   : undefined

  // const { callback } = useSendSwapTransaction(account, chainId, library, trade, swapCalls)

  // const { address: recipientAddress } = useENS(recipientAddressOrName)
  // const recipient = recipientAddressOrName === null ? account : recipientAddress
  return { isLoading, isError, data, currentData, error }
}
