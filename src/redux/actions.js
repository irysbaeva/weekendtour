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

const toursLoaded = (newTours) => {
  return { type: "FETCH_TOURS_SUCCESS", payload: newTours };
};

const toursRequested = () => {
  return { type: "FETCH_TOURS_REQUEST" };
};

const toursError = (error) => {
  return { type: "FETCH_TOURS_FAILURE", payload: error };
};

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
  };
};
export const fetchTours = (tourService, dispatch) => () => {
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
      dispatch(tourLoaded(transformTour(data)));
    })
    .catch((err) => dispatch(toursError(err)));
};

export const fetchNewTour = (tourService, dispatch) => (data) => {
  tourService
    .addTour(data)
    .then(dispatch(toursRequested()))
    .catch((err) => console.log(err));
};

export const fetchEditTour = (tourService, dispatch) => (id, data) => {
  tourService.editTour(id, data);
  // .then(dispatch(toursRequested()))
  // .then(data=>console.log(data)
  // )
  // .catch((err) => console.log(err));
};

const addUser = () => {
  return { type: "ADD_USER_SUCCESS" };
};
export const loginUser = () => {
  return { type: "LOGIN_USER_SUCCESS" };
};

export const logoutUser = () => {
  return { type: "LOGOUT_USER_SUCCESS" };
};
export const fetchNewUser = (tourService, dispatch) => (data) => {
  tourService
    .addUser(data)
    .then(({ data }) => {
      dispatch(addUser);
      localStorage.setItem("token", data.token);
    })
    .catch((err) => console.log(err));
};

export const fetchLogin = (tourService, dispatch) => (data) => {
  return tourService
    .login(data)
    .then(({ data }) => {
      if (data.message === "Auth succesful") {
        dispatch(loginUser());
        localStorage.setItem("token", data.token);
      }
    })
    .catch((err) => console.log(err));
};

