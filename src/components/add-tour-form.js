import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import UploadImage from "./upload";

import {
  titleAdded,
  startDateAdded,
  endDateAdded,
  descriptionAdded,
  includesAdded,
  priceAdded,
  companyAdded,
} from "../redux/actions";

const AddTourForm = ({
  titleAdded,
  startDateAdded,
  endDateAdded,
  descriptionAdded,
  priceAdded,
  includesAdded,
  companyAdded,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Данные тура
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Маршрут"
            fullWidth
            onChange={(e) => titleAdded(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="startDate"
            name="startDate"
            label="Дата начала"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              startDateAdded(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="endDate"
            name="endDate"
            label="Дата окончания"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={(e) => endDateAdded(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Описание тура"
            fullWidth
            onChange={(e) => descriptionAdded(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="includes"
            name="includes"
            label="В стоимость включено"
            fullWidth
            onChange={(e) => includesAdded(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Стоимость"
            fullWidth
            onChange={(e) => priceAdded(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="companyName"
            name="companyName"
            label="Организатор"
            fullWidth
            onChange={(e) => companyAdded(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            <UploadImage />
          </div>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  titleAdded,
  startDateAdded,
  endDateAdded,
  descriptionAdded,
  priceAdded,
  includesAdded,
  companyAdded,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTourForm);
