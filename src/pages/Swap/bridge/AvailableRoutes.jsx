import React from 'react';
// import "./bridge.scss"
// import Wallet from '../../../utils/wallet';
import RouteItemWrapper from './RouteItemWrapper';
import styled from 'styled-components/macro'
import { ethers } from 'ethers';

const StyledHeader = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: flex-center;
  border-radius: 50%;
  height: 8px;
  width: full;
  margin: 21px;
`

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  /* border-radius: 11px; */
`

function returnEstimatedReturnAmountDeductedByFees(estimateTx) {
  let bridgeFee = ethers.utils.formatUnits(
    estimateTx.quote?.bridgeFee,
    estimateTx.quote?.decimals,
  );
  bridgeFee = Number.parseFloat(bridgeFee);

  let destTxFee = estimateTx.quote?.destinationTxFee
    ? ethers.utils.formatUnits(estimateTx.quote?.destinationTxFee, estimateTx.quote?.decimals)
    : 0;
  destTxFee = Number.parseFloat(destTxFee);

  let returnAmount = ethers.utils.formatUnits(
    estimateTx.quote?.amount,
    estimateTx.quote?.decimals,
  );

  const totalFeeWithoutGas = bridgeFee + destTxFee;

  // value being displayed to the users => return amount -  destinationTxFee - bridgeFee
  const estimatedReturnAmountDeductedByFees = Number.parseFloat(returnAmount) - totalFeeWithoutGas;

  return { estimatedReturnAmountDeductedByFees, totalFeeWithoutGas };
}

export default function AvailableRoutes(props) {
  const GENERIC_SUPPORTED_BRIDGE_TOKENS = ['USDC', 'USDT', 'DAI'];

  const routes = props.routes.map((v, i) => {
    let route = [];

    const bridgeType = v.route[0].bridge;
    let targetBridgeToken = 'USDC';

    // value being displayed to the users => return amount -  desinationTxFee - bridgeFee
    // const totalFeeWithoutGas = -( v.destinationTxFee + v.bridgeFee) * Math.pow(10, -8) 
    // const estimatedReturnAmountDeductedByFees = props.fromAmount -( v.destinationTxFee + v.bridgeFee) * Math.pow(10, -8) 
    const { estimatedReturnAmountDeductedByFees, totalFeeWithoutGas } =
      returnEstimatedReturnAmountDeductedByFees(v);

    route.push({
      type: 'token-network',
      token: props.fromToken,
      amount: props.fromAmount,
      network: props.fromChain,
    });

    route.push({
      type: 'bridge',
      data: {
        name: v.route[0].bridge,
        fee: 0.05,
      },
    });

    // if (bridgeType === 'connext' && targetBridgeToken != props.to.symbol.toUpperCase()) {
    //   route.push({
    //     type: 'swap',
    //     data: {
    //       fee: bridgeFee,
    //     },
    //   });
    // }

    route = route.concat([
      {
        type: 'token-network',
        amount: estimatedReturnAmountDeductedByFees,
        token: props.toToken.symbol,
        network: props.toChain,
      },
      {
        type: 'additional',
        fee: totalFeeWithoutGas.toFixed(6),
        duration: v.duration ? v.duration : 'high',
      },
    ]);

    return {
      transactionId: v.estimate?.id,
      route,
      bridgeType,
    };
  });

  return (
    <div
    >
      <div
      >
        <div>
          <StyledHeader>SWING routes available:</StyledHeader>
        </div>
      </div>
      <StyledFlex>
        {routes
          // ?.filter((item) => item.bridgeType === 'celer' || item.bridgeType === 'nxtp' || item.bridgeType === 'anyswap')
          .map((item, i) => (
            <RouteItemWrapper handleChange={props.handleChange} key={i} data={item} index={i} routeColor={props.routeColor(i)} />
          ))}
      </StyledFlex>
    </div>
  );
}
