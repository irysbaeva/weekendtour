import React from "react";

import { TourServiceConsumer } from "./tour-service-context";

const withTourService = () => (Wrapped) => {
  return (props) => {
    return (
      <TourServiceConsumer>
        {(tourService) => {
          return <Wrapped {...props} 
          tourService={tourService} />;
        }}
      </TourServiceConsumer>
    );
  };
};

export default withTourService;
