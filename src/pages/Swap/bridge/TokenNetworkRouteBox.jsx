import React from 'react';
// import TokenIconImg from '../TokenIconImg';
import styled from 'styled-components/macro'
import { useDerivedSwapInfo } from 'state/swap/hooks';
// import TokenIconImg from './TokenIconImg'
import { Field } from '../../../state/swap/actions'
import CurrencyLogo from 'components/CurrencyLogo';

const StyledTokenWrapper = styled.div`
  display: flex;
  padding: 7px 4px;
  align-items: center;
`
const StyledTokenSymbol = styled.div`
      font-weight: bold;
      line-height: 14px;
      font-size: 11px;
      /* color: white; */
      margin-left: 11px;

`
const StyledTokenAmount = styled.div`
      line-height: 14px;
      font-size: 11px;
      /* color: white; */
      margin-left: 11px;

`

const StyledNetwork = styled.div`
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
background-color: rgb(119, 51, 255, 0.16);
font-size: 11px;
color: white;
/* border-radius: 11px; */
padding-top: 1px;
padding-bottom: 3px;
`

const StyledBox = styled.div`
  font-size: $route-box-font-size;
  font-weight: bold;
  line-height: 14px;
  display: flex;
  padding: 7px 4px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  width: 100px;
  height: $route-box-height;
  border: 1px solid var(--box-border);
  border-radius: 8px;
  margin-right: 11px;
  margin-left: 11px;
`

const TokenNetworkRouteBox = ({ info }) => {
  const limitDecimalNumbers = (value) => Number.parseFloat(value).toFixed(6);

  const {
    currencies,
  } = useDerivedSwapInfo()


  return (
    <StyledBox >
      {info && (
        <div>
          <StyledTokenWrapper>
            <CurrencyLogo currency={currencies[Field.INPUT]} />
            <div>
              <StyledTokenSymbol>{info?.token?.symbol}</StyledTokenSymbol>
              <StyledTokenAmount>{limitDecimalNumbers(info?.amount)}</StyledTokenAmount>
            </div>
          </StyledTokenWrapper>
          <StyledNetwork>
            <div>{info?.network?.slug}</div>
          </StyledNetwork>
        </div>
      )}
    </StyledBox>
  );
};

export default TokenNetworkRouteBox;
