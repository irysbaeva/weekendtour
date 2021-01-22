import moment from "moment";

export const titleAdded = (e) => ({ type: "ADD_TITLE", payload: e });
export const startDateAdded = (e) => ({ type: "ADD_START_DATE", payload: e });
export const endDateAdded = (e) => ({ type: "ADD_END_DATE", payload: e });
export const descriptionAdded = (e) => ({
  type: "ADD_DESCRIPTION",
  payload: e,
});
export const priceAdded = (e) => ({ type: "ADD_PRICE", payload: e });
export const includesAdded = (e) => ({ type: "ADD_INCLUDES", payload: e });
export const companyAdded = (e) => ({ type: "ADD_COMPANY", payload: e });
export const imageAdded = (e) => ({ type: "ADD_IMAGE", payload: e });

export const titleEdited = (e) => ({ type: "EDIT_TITLE", payload: e });
const toursLoaded = (newTours) => {
  return { type: "FETCH_TOURS_SUCCESS", payload: newTours };
};

const toursRequested = () => {
  return { type: "FETCH_TOURS_REQUEST" };
};

const toursError = (error) => {
  return { type: "FETCH_TOURS_FAILURE", payload: error };
};
const dateFormat = (date) => {
  moment.locale("ru");
  return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
};
export const fetchTours = (tourService, dispatch) => () => {
  const transformTour = (tour) => {
    return {
      id: tour._id,
      title: tour.title,
      startDate: dateFormat(tour.startDate),
      endDate: dateFormat(tour.endDate),
      description: tour.description,
      price: tour.price,
      includes: tour.includes,
      company: tour.company,
      image: tour.image,
    };
  };
  dispatch(toursRequested());
  tourService
    .getTours()
    .then(({ data }) => {
      dispatch(toursLoaded(data.map(transformTour)));
    })
    .catch((err) => dispatch(toursError(err)));
};

export const tourLoaded = (tour) => {
  return { type: "FETCH_TOUR_SUCCESS", payload: tour };
};

export const fetchTour = (tourService, dispatch) => (id) => {
  tourService
    .getTour(id)
    .then(({ data }) => {
      dispatch(
        tourLoaded({
          ...data,
          startDate: dateFormat(data.startDate),
          endDate: dateFormat(data.endDate),
        })
      );
    })
    .catch((err) => dispatch(toursError(err)));
};

export const fetchNewTour = (tourService, dispatch) => (data) => {
  tourService
    .addTour(data)
    .then(dispatch(toursRequested()))
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export const fetchEditTour = (tourService, dispatch) => (id, data) => {
  tourService.editTour(id, data);
  // .then(dispatch(toursRequested()))
  // .then(data=>console.log(data)
  // )
  // .catch((err) => console.log(err));
};
