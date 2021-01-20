import React, { useState } from "react";
import { connect } from "react-redux";
import { imageAdded } from "../redux/actions";
import axios from "axios";

export const UploadImage = ({ imageAdded, newTour }) => {
  const [files, setFiles] = useState(null);

  const fileSelectedHandler = (event) => {
    setFiles(event.target.files[0]);
    imageAdded(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("image", files);
    await axios.post("/tours", fd).then((res) => console.log(res));
  };
  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Submit</button>
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
