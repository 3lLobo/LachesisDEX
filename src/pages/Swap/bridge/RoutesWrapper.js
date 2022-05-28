import AvailableRoutes from './AvailableRoutes'
import { useState, useEffect } from 'react'
import { useSwingPostSwapMutation } from 'state/routing/sliceSwingJs'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import styled, { keyframes, useTheme } from 'styled-components/macro'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  display: flex;
  align-items: center;
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme }) => theme.text1};
  background: transparent;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  /* position: relative; */
  transition: 250ms ease border-color;
  margin: 21px;
  padding: 36px;
  /* left: 23px;
  top: 23px; */
`

const StyledSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
    padding-left: 170px
`

export default function RoutesWrapper({ swingQuote, setSwingTx, swingQuoteArgs, typedValue, isLoading, isFetching }) {

    const theme = useTheme()
    const [swingArgs, setSwingArgs] = useState(skipToken)
    const [activeIndex, setActiveIndex] = useState()
    const [trigger, { isLoading: isLoadingTx, data: swingTx, isError }] = useSwingPostSwapMutation()

    const routeColor = (i) => {
        var color;
        if (i.toString() === activeIndex) {
            if (!isLoadingTx && !isError) {
                /* green */
                color = 'rgb(136, 211, 111, 0.9)'
            } else if (isLoadingTx) {
                /* blue */
                color = 'rgb(107, 91, 149)'
            } else {
                /* red */
                color = 'rgb(210, 56, 108, 0.69)'
            }
        } else {
            color = 'transparent'
        }
        return color
    }

    useEffect(() => {
        if (!isLoading && swingTx !== undefined) {
            setSwingTx(swingTx)
        }
    }, [swingTx, isLoading])

    const handleChange = (e) => {
        const routeIndex = e.target.value
        setActiveIndex(routeIndex)
        if (swingQuote !== undefined) {
            const chosenRoute = swingQuote.routes[routeIndex]?.route[0]
            const newArgs = {
                ...swingQuoteArgs,
                route: [chosenRoute],
            }
            setSwingArgs(newArgs)
            trigger(newArgs)
        }
    }
    return (
        <div>
            {isLoading | (isFetching && swingQuote === undefined)
                ? <StyledSpinnerWrapper><Spinner theme={theme} /></StyledSpinnerWrapper>
                :
                <div>
                    {swingQuote !== undefined &&
                        <AvailableRoutes {...swingQuote} fromAmount={typedValue} handleChange={handleChange} routeColor={routeColor} />
                    }
                </div>
            }
        </div>
    )
}
