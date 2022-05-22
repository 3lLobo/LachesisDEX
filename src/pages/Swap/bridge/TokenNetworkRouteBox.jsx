import React from 'react';
// import TokenIconImg from '../TokenIconImg';

const TokenNetworkRouteBox = ({ info }) => {
  const limitDecimalNumbers = (value) => Number.parseFloat(value).toFixed(6);

  return (
    <div className="token-network-route-box">
      {info && (
        <div>
          <div className="token-wrapper">
            {/* <TokenIconImg size={16} mr={7} token={info.token} /> */}
            <div>
              {/* <div className="symbol">{info.token.symbol}</div> */}
              <div className="amount">{limitDecimalNumbers(info?.amount)}</div>
            </div>
          </div>
          <div className="network-name" >
            <div className="text">{info?.network?.label}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenNetworkRouteBox;
