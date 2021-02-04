import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { fetchBookings } from "../redux/actions";
import { useEffect } from "react";
import compose from "../compose";
import withTourService from "../with-tour-service";
import { connect } from "react-redux";
import Spinner from "./spinner";
import ErrorIndicator from "./error-indicator";

const columns = [
  { field: "firstName", headerName: "Имя", width: 210 },
  { field: "lastName", headerName: "Фамилия", width: 210 },
  { field: "tour", headerName: "Тур", width: 350 },
  { field: "seats", headerName: "Количество мест", type: "number", width: 150 },
  { field: "email", headerName: "email", sortable: false, width: 200 },
  { field: "phone", headerName: "Телефон", sortable: false, width: 200 },
];

const Bookings = ({ fetchBookings, bookings, loading, error }) => {
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={bookings} columns={columns} pageSize={10} />
    </div>
  );
};

const mapStateToProps = ({ bookings, loading, error }) => {
  return {
    bookings,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchBookings: fetchBookings(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Bookings);
