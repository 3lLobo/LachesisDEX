import React from 'react';
import "./bridge.scss"
import styled from 'styled-components/macro'

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* transition: left $bridge-widget-anim-timing ease-in-out, */
    /* opacity: 111ms ease-in-out, */
    /* transform $bridge-widget-anim-timing ease-in-out; */
    /* min-height: 330px; */
    /* background: blueviolet; */
    position: relative;
    z-index: 10;
    /* top: 0; */
    /* width: 100%; */
    opacity: 1;
`
const StyledText = styled.div`
    display: flex;
    flex-direction: column;
  font-size: 12px;
  margin: 4px;
      display: flex;
    justify-content: space-between;
`

const AdditionalInfoItem = ({ info }) => {
  return (
    <div className="bridge-widget">
      <StyledHeader className="additional-info">
        <StyledText className="fee-wrapper">
          <span className="title">Fees</span>
          <span className="value">{info.bridgeFee}</span>
        </StyledText>
        <StyledText className="duration-wrapper">
          <span className="title">Duration</span>
          <span className="value">{info.duration}</span>
        </StyledText>
      </StyledHeader>
    </div>
  );
};

export default AdditionalInfoItem;
