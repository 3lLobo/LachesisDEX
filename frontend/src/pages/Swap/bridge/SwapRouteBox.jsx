import React from 'react';

const SwapRouteBox = ({ info }) => {
  return (
    <div className="swap-bridge-route-box">
      {info && (
        <>
          <div className="title-wrapper">
            <img
              src={info.type === 'swap' ? '/images/swap_box.svg' : '/images/bridge_box.svg'}
              alt={info.type === 'swap' ? 'swap-box' : 'bridge_box'}
            />
            <div className="title">{info.type === 'swap' ? 'Swap' : `${info.data.name} Bridge`}</div>
          </div>
          <div className="fee-wrapper">
            <span className="text">Fee: {info.type === 'swap' ? `$${info.data.fee}` : `${info.data.fee}%`}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SwapRouteBox;
