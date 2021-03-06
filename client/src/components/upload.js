import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { imageAdded } from "../redux/actions";

export const UploadImage = ({ imageAdded }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const fileSelectedHandler = (files) => {
    imageAdded(files[0]);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained"
        color="primary" onClick={handleOpen}>Добавить фото</Button>
      <DropzoneDialog
        open={open}
        onSave={fileSelectedHandler}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  );
};

const mapStateToProps = ({ newTour }) => {
  return {
    newTour,
  };
};



export default connect(mapStateToProps, {imageAdded})(UploadImage);
