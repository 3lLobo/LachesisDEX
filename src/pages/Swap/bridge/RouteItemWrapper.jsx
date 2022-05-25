import React from 'react';
import RouteItemView from './RouteItemView';
// import RouteItemMobileView from './RouteItemMobileView';
import "./bridge.scss"
import styled from 'styled-components/macro'


const StyledItemWrapper = styled.div`
  /* height: 75px; */
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  background-color: transparent;
  align-items: center;
  /* &:not(:last-child) {
    margin-bottom: 12px;
  } */
`
export default function RouteItemWrapper(props) {
  const routeItem = props.data?.route;

  return (
    <StyledItemWrapper >
      <input
        type="radio"
        id={'control_' + props.index}
        name="select"
        value={props.data?.transactionId}
        onChange={props.handleChange}
        defaultChecked={props.index === 0}
      />
      <label htmlFor={'control_' + props.index}>
        <RouteItemView data={routeItem} />
        {/* <RouteItemMobileView data={routeItem} /> */}
      </label>
    </StyledItemWrapper>
  );
}
