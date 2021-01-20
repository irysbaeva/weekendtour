import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchTour } from "../redux/actions";
import { connect } from "react-redux";

import compose from "../compose";
import withTourService from "../with-tour-service";

const TourDescription = ({ fullDescription, fetchTour }) => {
  let { id } = useParams();

  useEffect(() => {
    fetchTour(id);
  }, [fetchTour,id]);

  return (
    <div>
      fullDescription {id} ==== {fullDescription.title}
      {fullDescription.startDate}
      {fullDescription.endDate}
    </div>
  );
};

const mapStateToProps = ({ fullDescription }) => {
  return {
    fullDescription,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchTour: fetchTour(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TourDescription);
