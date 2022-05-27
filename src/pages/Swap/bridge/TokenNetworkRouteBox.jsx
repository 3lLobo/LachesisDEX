import React from 'react';
// import TokenIconImg from '../TokenIconImg';
import "./bridge.scss"
import styled from 'styled-components/macro'


const StyledBox = styled.div`
  font-size: $route-box-font-size;
  font-weight: bold;
  line-height: 14px;
  display: flex;
  padding: 7px 4px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100px;
  height: $route-box-height;
  border: 1px solid var(--box-border);
  border-radius: 8px;
`
const TokenNetworkRouteBox = ({ info }) => {
  const limitDecimalNumbers = (value) => Number.parseFloat(value).toFixed(6);

  return (
    <StyledBox className="token-network-route-box">
      {info && (
        <div>
          <div className="token-wrapper">
            {/* <TokenIconImg size={16} mr={7} token={info.token} /> */}
            <div>
              {/* <div className="symbol">{info.token.symbol}</div> */}
              <div className="amount">{limitDecimalNumbers(info?.amount)}</div>
              {/* <div className="amount">{info?.amount}</div> */}
            </div>
          </div>
          <div className="network-name" >
            <div className="text">{info?.network?.slug}</div>
          </div>
        </div>
      )}
    </StyledBox>
  );
};

export default TokenNetworkRouteBox;
