import React from 'react';
import TokenNetworkRouteBox from './TokenNetworkRouteBox';
import SwapRouteBox from './SwapRouteBox';
import AdditionalInfoItem from './AdditionalInfoItem';
import DashedDivider from './DashedDivider';

const RouteItemView = ({ data }) => {
  console.log("DATA: ",data)
  return (
    <div className="bridge-route-item">
      {data.length > 0 &&
        data.map((item, index) => {
          switch (item.type) {
            case 'token-network':
              return (
                <div key={index} className="is-flex is-flex-direction-row is-align-items-center">
                  <TokenNetworkRouteBox info={item} />
                  {data.length - 2 !== index && <DashedDivider />}
                </div>
              );
            case 'swap':
              return (
                <div key={index} className="is-flex is-flex-direction-row is-align-items-center">
                  <SwapRouteBox info={item} />
                  {data.length - 2 !== index && <DashedDivider />}
                </div>
              );
            case 'bridge':
              return (
                <div key={index} className="is-flex is-flex-direction-row is-align-items-center">
                  <SwapRouteBox info={item} />
                  {data.length - 2 !== index && <DashedDivider />}
                </div>
              );
            case 'additional':
              return <AdditionalInfoItem key={index} info={item} />;
            default:
              return null;
          }
        })}
    </div>
  );
};

export default RouteItemView;
