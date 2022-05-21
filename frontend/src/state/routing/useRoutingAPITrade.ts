import { skipToken } from '@reduxjs/toolkit/query/react'
import { Currency, CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import { IMetric, MetricLoggerUnit, setGlobalMetric } from '@uniswap/smart-order-router'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useStablecoinAmountFromFiatValue } from 'hooks/useUSDCPrice'
import { useRoutingSwingAPIArguments } from 'lib/hooks/routing/useRoutingSwingAPIArguments'
import useIsValidBlock from 'lib/hooks/useIsValidBlock'
import ms from 'ms.macro'
import { useMemo } from 'react'
import ReactGA from 'react-ga4'
import { useSwingGetQuoteQuery } from 'state/routing/sliceSwing'

import { GetQuoteResult, GetSwingQuoteResult, InterfaceTrade, TradeState } from './types'
import { computeRoutes, computeSwingRoutes, transformRoutesToTrade } from './utils'

/**
 * Returns the best trade by invoking the routing api or the smart order router on the client
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
export function useRoutingAPITrade<TTradeType extends TradeType>(
  tradeType: TTradeType,
  amountSpecified?: CurrencyAmount<Currency>,
  otherCurrency?: Currency
): {
  state: TradeState
  trade: InterfaceTrade<Currency, Currency, TTradeType> | undefined
} {
  const [currencyIn, currencyOut]: [Currency | undefined, Currency | undefined] = useMemo(
    () =>
      tradeType === TradeType.EXACT_INPUT
        ? [amountSpecified?.currency, otherCurrency]
        : [otherCurrency, amountSpecified?.currency],
    [amountSpecified, otherCurrency, tradeType]
  )

  // const [clientSideRouter] = useClientSideRouter()

  // const queryArgs = useRoutingAPIArguments({
  //   tokenIn: currencyIn,
  //   tokenOut: currencyOut,
  //   amount: amountSpecified,
  //   tradeType,
  //   useClientSideRouter: clientSideRouter,
  // })

  // const { isLoading, isError, data, currentData } = useGetQuoteQuery(queryArgs ?? skipToken, {
  //   pollingInterval: ms`15s`,
  //   refetchOnFocus: true,
  // })

  const { account } = useActiveWeb3React()

  const queryArgs = useRoutingSwingAPIArguments({
    tokenIn: currencyIn,
    tokenOut: currencyOut,
    amount: amountSpecified,
    fromUserAddress: account ?? undefined,
    toUserAddress: undefined,
  })

  const { isLoading, isError, data, currentData } = useSwingGetQuoteQuery(queryArgs ?? skipToken, {
    pollingInterval: ms`15s`,
    refetchOnFocus: true,
  })

  // const quoteResult: GetSwingQuoteResult | undefined = useIsValidBlock(Number(data?.blockNumber) || 0)
  //   ? data
  //   : undefined
  const quoteResult: GetSwingQuoteResult | undefined = data
  console.log('ZZZZZZZZZZZZ', data)

  const route = useMemo(
    () => computeSwingRoutes(currencyIn, currencyOut, amountSpecified, quoteResult),
    [currencyIn, currencyOut, quoteResult, amountSpecified]
  )

  // get USD gas cost of trade in active chains stablecoin amount
  // const gasUseEstimateUSD = useStablecoinAmountFromFiatValue(quoteResult?.gasUseEstimateUSD) ?? null

  const isSyncing = currentData !== data

  return useMemo(() => {
    if (!currencyIn || !currencyOut) {
      return {
        state: TradeState.INVALID,
        trade: undefined,
      }
    }

    if (isLoading && !quoteResult) {
      // only on first hook render
      return {
        state: TradeState.LOADING,
        trade: undefined,
      }
    }

    // const otherAmount =
    //   tradeType === TradeType.EXACT_INPUT
    //     ? currencyOut && quoteResult
    //       ? CurrencyAmount.fromRawAmount(currencyOut, quoteResult.quote)
    //       : undefined
    //     : currencyIn && quoteResult
    //     ? CurrencyAmount.fromRawAmount(currencyIn, quoteResult.quote)
    //     : undefined

    if (isError /*|| !otherAmount*/ || !route || route.length === 0 || !queryArgs) {
      return {
        state: TradeState.NO_ROUTE_FOUND,
        trade: undefined,
      }
    }

    // try {
    //   const trade = transformRoutesToTrade(route, tradeType, gasUseEstimateUSD)
    //   return {
    //     // always return VALID regardless of isFetching status
    //     state: isSyncing ? TradeState.SYNCING : TradeState.VALID,
    //     trade,
    //   }
    // } catch (e) {
    return { state: TradeState.INVALID, trade: undefined }
    //}
  }, [
    currencyIn,
    currencyOut,
    quoteResult,
    isLoading,
    //tradeType,
    isError,
    route,
    queryArgs,
    //gasUseEstimateUSD,
    isSyncing,
  ])
}

// only want to enable this when app hook called
class GAMetric extends IMetric {
  putDimensions() {
    return
  }

  putMetric(key: string, value: number, unit?: MetricLoggerUnit) {
    ReactGA._gaCommandSendTiming('Routing API', `${key} | ${unit}`, value, 'client')
  }
}

setGlobalMetric(new GAMetric())