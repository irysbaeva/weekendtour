import React from "react";
import { connect } from "react-redux";
import { imageAdded } from "../redux/actions";

export const UploadImage = ({ imageAdded }) => {
  const fileSelectedHandler = (event) => {
    imageAdded(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
    </div>
  );
};

const mapStateToProps = ({ newTour }) => {
  return {
    newTour,
  };
};

const mapDispatchToProps = {
  imageAdded,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
