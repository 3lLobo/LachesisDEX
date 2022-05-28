import React from 'react';
import "./bridge.scss"
import styled from 'styled-components/macro'


const StyledText = styled.div`
    display: flex;
    flex-direction: row;
  font-size: 11px;
  margin: 4px;
    justify-content: space-between;
`
const StyledTitle = styled.div`
  font-weight: bold;
  margin-right: 4px;
`

const StyledWidget = styled.span`
  display: flex;
  /* padding: 7px 4px; */
  align-items: right;
  flex-direction: column;
  justify-content: space-between;
  padding: 11px;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
`

const AdditionalInfoItem = ({ info }) => {
  return (
    <StyledWidget>
      <StyledText>
        <StyledTitle>Fees:</StyledTitle>
        <span className="value">{info.fee}</span>
      </StyledText>
      <StyledText>
        <StyledTitle>Duration:</StyledTitle>
        <span>{info.duration}</span>
      </StyledText>
    </StyledWidget>
  );
};

export default AdditionalInfoItem;
