let initialState = {
  tours: [],
  loading: true,
  error: null,
  isLoggedin: false,
  currentUser: null,
  newTour: {
    id: null,
    title: null,
    startDate: null,
    endDate: null,
    description: null,
    price: null,
    includes: null,
    company: null,
    image: null,
    seats: null,
  },
  newBooking: {
    tour: null,
  },
  bookings: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TOURS_REQUEST":
      return {
        ...state,
        tours: [],
        loading: true,
        error: null,
      };

    case "FETCH_TOURS_SUCCESS":
      return {
        ...state,
        tours: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_TOURS_FAILURE":
      return {
        ...state,
        tours: [],
        loading: false,
        error: action.payload,
      };
    case "ADD_TITLE":
      return {
        ...state,
        newTour: { ...state.newTour, title: action.payload },
      };
    case "ADD_START_DATE":
      return {
        ...state,
        newTour: { ...state.newTour, startDate: action.payload },
      };
    case "ADD_END_DATE":
      return {
        ...state,
        newTour: { ...state.newTour, endDate: action.payload },
      };
    case "ADD_DESCRIPTION":
      return {
        ...state,
        newTour: { ...state.newTour, description: action.payload },
      };
    case "ADD_PRICE":
      return {
        ...state,
        newTour: { ...state.newTour, price: action.payload },
      };
    case "ADD_INCLUDES":
      return {
        ...state,
        newTour: { ...state.newTour, includes: action.payload },
      };
    case "ADD_COMPANY":
      return {
        ...state,
        newTour: { ...state.newTour, company: action.payload },
      };
    case "ADD_IMAGE":
      return {
        ...state,
        newTour: { ...state.newTour, image: action.payload },
      };
    case "ADD_SEATS":
      return {
        ...state,
        newTour: { ...state.newTour, seats: action.payload },
      };

    case "SET_USER":
      return {
        ...state,
        isLoggedin: true,
        currentUser: action.payload
      };

    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedin: false,
        currentUser: {}
      };
    case "ADD_TOUR_TO_BOOK":
      return {
        ...state,
        newBooking: { ...state.newBooking, tour: action.payload },
      };
    case "CLEAR_BOOKING_INFO":
      return {
        ...state,
        newBooking: {}
      };
    case "CLEAR_NEW_TOUR_INFO":
      return {
        ...state,
        newTour: {}
      };

    case "FETCH_BOOKINGS_SUCCESS":
      return {
        ...state,
        bookings: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
