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
export const addedNewTour = () => ({ type: "ADD_NEW_TOUR" });
export const updateTours = () => ({ type: "UPDATE_TOURS" });

const toursLoaded = (newTours) => {
  return { type: "FETCH_TOURS_SUCCESS", payload: newTours };
};

const toursRequested = () => {
  return { type: "FETCH_TOURS_REQUEST" };
};

const toursError = (error) => {
  return { type: "FETCH_TOURS_FAILURE", payload: error };
};

export const fetchTours = (tourService, dispatch) => () => {
  dispatch(toursRequested());
  tourService
    .getTours()
    .then((data) => dispatch(toursLoaded(data)))
    .catch((err) => dispatch(toursError(err)));
};
