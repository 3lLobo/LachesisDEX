import React from 'react';
import "./bridge.scss"
import styled from 'styled-components/macro'

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    /* transition: left $bridge-widget-anim-timing ease-in-out, */
    /* opacity $bridge-widget-anim-timing ease-in-out, */
    /* transform $bridge-widget-anim-timing ease-in-out; */
    /* min-height: 330px; */
    /* background: var(--secondary-background) !important; */
    position: relative;
    z-index: 10;
    top: 0;
    width: 100%;
    opacity: 1;
`

const AdditionalInfoItem = ({ info }) => {
  return (
    <StyledHeader className="bridge-widget">
      <div className="additional-info">
        <div className="fee-wrapper">
          <span className="title">Fees</span>
          <span className="value">{info.bridgeFee}</span>
        </div>
        <div className="duration-wrapper">
          <span className="title">Duration</span>
          <span className="value">{info.duration}</span>
        </div>
      </div>
    </StyledHeader>
  );
};

export default AdditionalInfoItem;
