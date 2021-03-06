import transformTour from "../utils/transformTour";
import tourService from "../tour-service";

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
export const seatsAdded = (e) => ({ type: "ADD_SEATS", payload: e });

const toursLoaded = (tours) => {
  return { type: "FETCH_TOURS_SUCCESS", payload: tours };
};

const toursRequested = () => {
  return { type: "FETCH_TOURS_REQUEST" };
};

const toursError = (error) => {
  return { type: "FETCH_TOURS_FAILURE", payload: error };
};

export const fetchTours = () => (dispatch) => {
  dispatch(toursRequested());
  tourService
    .getTours()
    .then(({ data }) => {
      dispatch(toursLoaded(data.map(transformTour)));
    })
    .catch((err) => {
      dispatch(toursError(err));
      return Promise.reject(new Error(err));
    });
};

export const fetchTour = (id) => (dispatch) => {
  return tourService
    .getTour(id)
    .then(({ data }) => transformTour(data))
    .catch((err) => {
      dispatch(toursError(err));
      return Promise.reject(new Error(err));
    });
};
const clearNewTourInfo = () => ({ type: "CLEAR_NEW_TOUR_INFO" });

export const fetchNewTour = (data) => (dispatch) => {
  tourService
    .addTour(data)
    .then(({ data }) => {
      dispatch(clearNewTourInfo());
      return data;
    })
    .catch((err) => {
      return Promise.reject(new Error(err));
    });
};

export const fetchEditTour = (id,data) => (dispatch) => {
  tourService.editTour(id, data);
  // .then(dispatch(toursRequested()))
  // .then(data=>console.log(data)
  // )
  // .catch((err) => console.log(err));
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const logoutUser = () => {
  return { type: "LOGOUT_USER" };
};

export const fetchNewUser = (data) => (dispatch) => {
  return tourService
    .addUser(data)
    .then(({ data }) => {
      if (data.message === "User created") {
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);
        return data.message;
      }
    })
    .catch((err) => {
      return Promise.reject(new Error(err));
    });
};

export const fetchLogin = (data) => (dispatch) => {
  return tourService
    .login(data)
    .then(({ data }) => {
      if (data.message === "Auth succesful") {
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return data.message;
      }
    })
    .catch((err) => {
      return Promise.reject(new Error(err));
    });
};

export const addTourToBook = (e) => ({ type: "ADD_TOUR_TO_BOOK", payload: e });

const clearBookingInfo = () => ({ type: "CLEAR_BOOKING_INFO" });
const bookingsLoaded = (bookings) => {
  return { type: "FETCH_BOOKINGS_SUCCESS", payload: bookings };
};

const transformBooking = (booking) => {
  return {
    ...booking,
    id: booking._id,
    tour: booking.tour ? booking.tour.title : "Тур отменен",
  };
};
export const fetchBookings = () => (dispatch) => {
  tourService
    .getBookings()
    .then(({ data }) => {
      dispatch(bookingsLoaded(data.map(transformBooking)));
    })

    .catch((err) => {
      dispatch(toursError(err));
      return Promise.reject(new Error(err));
    });
};

export const fetchNewBooking = (data) => (dispatch) => {
  tourService
    .addBooking(data)
    .then(() => {
      dispatch(clearBookingInfo());
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(new Error(err));
    });
};
