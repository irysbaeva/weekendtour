import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { fetchTours } from "../redux/actions";
import { useEffect } from "react";
import compose from "../compose";
import withTourService from "../with-tour-service";
import { connect } from "react-redux";
import Spinner from "./spinner";
import ErrorIndicator from "./error-indicator";

const columns = [
  { field: "title", headerName: "Маршрут", width: 210 },
  { field: "startDate", headerName: "Дата начала", width: 180 },
  { field: "endDate", headerName: "Дата окончания", width: 180 },
  {
    field: "price",
    headerName: "Цена",
    type: "number",
    width: 120,
  },
  {
    field: "description",
    headerName: "Краткое описание",
    sortable: false,
    width: 600,
  },
  {
    field: "company",
    headerName: "Организатор",
    sortable: false,
    width: 150,
  },
];

const Schedule = ({ fetchTours, tours, loading, error }) => {
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={tours} columns={columns} pageSize={10} />
    </div>
  );
};

const mapStateToProps = ({ tours, loading, error }) => {
  return {
    tours,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchTours: fetchTours(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Schedule);