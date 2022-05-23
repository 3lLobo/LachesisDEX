import React from 'react';
import "./bridge.scss"
// import Wallet from '../../../utils/wallet';
import RouteItemWrapper from './RouteItemWrapper';

export default function AvailableRoutes(props) {
  const GENERIC_SUPPORTED_BRIDGE_TOKENS = ['USDC', 'USDT', 'DAI'];

  const routes = props.routes.map((v, i) => {
    let route = [];

    const bridgeType = v.route[0].bridge;
    let targetBridgeToken = 'USDC';

    // value being displayed to the users => return amount -  desinationTxFee - bridgeFee
    // const { estimatedReturnAmountDeductedByFees, totalFeeWithoutGas } =
    // Wallet.returnEstimatedReturnAmountDeductedByFees(v);
    const estimatedReturnAmountDeductedByFees = 111
    const totalFeeWithoutGas = 1

    route.push({
      type: 'token-network',
      token: props.from,
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
        token: props.to,
        network: props.toChain,
      },
      {
        type: 'additional',
        fee: totalFeeWithoutGas.toFixed(6),
        duration: v?.duration ? v?.duration : 'high',
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
      className='available-routes-wrapper control'
      aria-label="Available routes for the swap"
    >
      <div
        className='loader-wrapper is-active'
      >
        <div className="loader is-loading" />
      </div>
      <div
      className='unavailable-warning-wrapper'
      >
        <div>
          <div>
            <ion-icon name="alert-circle-outline" />
          </div>
          <div>SWING routes availabe:</div>
        </div>
      </div>
      {routes
        ?.filter((item) => item.bridgeType === 'celer' || item.bridgeType === 'nxtp' || item.bridgeType === 'anyswap')
        .map((item, i) => (
          <RouteItemWrapper handleChange={props.handleChange} key={i} data={item} index={i} />
        ))}
    </div>
  );
}
