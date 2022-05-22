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

import { useTransactionAdder } from '../state/transactions/hooks'
import { TransactionType } from '../state/transactions/types'
import { currencyId } from '../utils/currencyId'
import { useCurrency } from './Tokens'
import useDebounce from './useDebounce'
import useENS from './useENS'
import { SignatureData } from './useERC20Permit'
import { AnyTrade } from './useSwapCallArguments'
import useTransactionDeadline from './useTransactionDeadline'

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwingSwapCallback(
  trade: AnyTrade | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  signatureData: SignatureData | undefined | null
): {
  state: SwapCallbackState
  callback: null | (() => Promise<TransactionSwap | undefined>)
  error: ReactNode | null
} {
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

  const { account } = useActiveWeb3React()

  const deadline = useTransactionDeadline()

  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient1 = recipientAddressOrName === null ? account : recipientAddress

  const {
    state,
    callback: libCallback,
    error,
  } = useLibSwapCallBack({
    trade,
    allowedSlippage,
    recipientAddressOrName: recipient,
    signatureData,
    deadline,
    amount: parsedAmount,
    amountSpecified: debouncedAmount,
    otherCurrency: debouncedOtherCurrency ?? undefined,
  })

  const callback = useMemo(() => {
    if (!libCallback) {
      return null
    }
    return () =>
      libCallback().then((response) => {
        if (!response) {
          return undefined
        }
        return response.tx
      })
  }, [addTransaction, allowedSlippage, trade])

  return {
    state,
    callback,
    error,
  }
}
