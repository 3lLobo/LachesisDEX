import React from 'react';
import styled from 'styled-components/macro'


const StyledBridgeBox = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 24px; */
  width: 62px;
  margin-top: 24px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-weight: bold;
  line-height: 11px;
  font-size: 11px;
`


const SwapRouteBox = ({ info }) => {
  return (
    <StyledBridgeBox>
      {info && (
        <div>{info.type === 'swap' ? 'Swap' : `${info.data?.name} Bridge`}</div>
      )}
    </StyledBridgeBox>
  );
};

export default SwapRouteBox;
