import React from 'react';
import RouteItemView from './RouteItemView';
// import RouteItemMobileView from './RouteItemMobileView';
import styled from 'styled-components/macro'

  const StyledItemWrapper = styled.div`
    /* height: 75px; */
    display: flex;
    flex-direction: row;
    border-radius: 21px;
    /* background-color: transparent; */
    align-items: center;
    background-color: ${({bgColor}) => bgColor};
    padding: 6px;
    &:not(:last-child) {
      margin-bottom: 3px;
    };
  `


export default function RouteItemWrapper(props) {
  const bgColor = props.routeColor
  const routeItem = props.data?.route;

  return (
    <StyledItemWrapper bgColor={bgColor}>
      <input
        type="radio"
        id={'control_' + props.index}
        name="select"
        value={props.index}
        onChange={(e) => props.handleChange(e)}
      // onSelect={(e) => props.handleChange(e)}
      // defaultChecked={props.index === 0}
      />
      <label htmlFor={'control_' + props.index}>
        <RouteItemView data={routeItem} bgColor={props.routeColor} />
        {/* <RouteItemMobileView data={routeItem} /> */}
      </label>
    </StyledItemWrapper>
  );
}
