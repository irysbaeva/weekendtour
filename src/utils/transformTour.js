import moment from "moment";

const transformTour = (tour) => {
  const dateFormat = (date) => {
    moment.locale("ru");
    return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
  };

  return {
    ...tour,
    id: tour._id,
    startDate: dateFormat(tour.startDate),
    endDate: dateFormat(tour.endDate),
    // company: tour.company.companyName,
  };
};
export default transformTour;
