import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { fetchTours } from "../redux/actions";
import { useEffect } from "react";
import compose from "../utils/compose";
import withTourService from "../with-tour-service";
import { connect } from "react-redux";
import Spinner from "./spinner";
import ErrorIndicator from "./error-indicator";
// import { Button } from "@material-ui/core";

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
    field: "seats",
    headerName: "Осталось мест",
    sortable: false,
    width: 150,
  },
  {
    field: "company",
    headerName: "Организатор",
    sortable: false,
    width: 150,
  },
];

const Schedule = ({ fetchTours, tours, loading, error }) => {
  const [transformTours, setTransformTours] = useState([]);
  useEffect(() => {
    fetchTours();

    setTransformTours(
      tours.map((tour) => ({
        ...tour,
        company: tour.company.companyName,
      }))
    );
  }, [fetchTours]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={transformTours}
          columns={columns}
          pageSize={5}
          onRowClick={(e) => console.log(e.row._id)}
        />
      </div>
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
