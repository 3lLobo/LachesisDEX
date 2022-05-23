// eslint-disable-next-line no-restricted-imports
import { Percent, TradeType } from '@uniswap/sdk-core'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { SwapCallbackState } from 'lib/hooks/swap/useSwapCallback'
import { useSwingSwapCallback as useLibSwapCallBack } from 'lib/hooks/swap/useSwingSwapCallback'
import tryParseCurrencyAmount from 'lib/utils/tryParseCurrencyAmount'
import { ReactNode, useMemo } from 'react'
import { TransactionSwap } from 'state/routing/types'
import { Field } from 'state/swap/actions'
import { useSwapState } from 'state/swap/hooks'
import { useSwingSwapQuery } from 'state/routing/sliceSwing'
import { useSwingSwapCallArguments } from 'hooks/useSwingSwapCallArguments'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { GetSwingQuoteResult, GetSwingSwapResult } from 'state/routing/types'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import swingApi from '../lib/swingApi'

import { useTransactionAdder } from '../state/transactions/hooks'
import { TransactionType } from '../state/transactions/types'
import { currencyId } from '../utils/currencyId'
import { useCurrency } from './Tokens'
import useDebounce from './useDebounce'
import useENS from './useENS'
import { SignatureData } from './useERC20Permit'
import { AnyTrade } from './useSwapCallArguments'
import useTransactionDeadline from './useTransactionDeadline'
import { useState } from 'react'

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwingSwapCallback(recipientAddressOrName: string | null): Promise<any> | undefined {
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
    recipient,
  } = useSwapState()

  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = useMemo(
    () => tryParseCurrencyAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined),
    [inputCurrency, isExactIn, outputCurrency, typedValue]
  )

  const [debouncedAmount, debouncedOtherCurrency] = useDebounce(
    useMemo(() => [parsedAmount, outputCurrency], [parsedAmount, outputCurrency]),
    200
  )

  console.log('🚀 ~ file: useSwingSwapCallback.tsx ~ line 56 ~ parsedAmount', parsedAmount)

  const { account, chainId, library } = useActiveWeb3React()

  const deadline = useTransactionDeadline()

  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient1 = recipientAddressOrName === null ? account : recipientAddress

  const [swingRoutes, setSwingRoutes] = useState<Promise<any> | undefined>()

  const swapCalls = useSwingSwapCallArguments({
    tokenIn: debouncedAmount?.currency,
    tokenOut: debouncedOtherCurrency,
    amount: debouncedAmount,
    fromUserAddress: account ?? undefined,
    toUserAddress: account ?? undefined,
  })

  console.log('🚀 ~ file: useSwingSwapCallback.tsx ~ line 81 ~ swapCalls', swapCalls)

  // const { isLoading, isError, data, currentData, error } = useSwingSwapQuery(swapCalls ?? skipToken, {
  //   pollingInterval: 15000,
  //   refetchOnFocus: true,
  // })

  const swingQuote = swingApi.getQuote(
    swapCalls?.fromChainId,
    debouncedAmount?.currency.symbol,
    debouncedOtherCurrency,
    swapCalls?.tokenAmount
  )
  setSwingRoutes(swingQuote)

  return swingRoutes
}
