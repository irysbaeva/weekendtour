let initialState = {
  tours: [],
  loading: true,
  error: null,
  isLoggedin: false,
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
  fullDescription: {
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

  users: [],
  newUser: {
    companyName: null,
    email: null,
    password: null,
  },
  newBooking: {
    firstName: null,
    lastName: null,
    seats: null,
    tour: null,
    email: null,
    phone: null,
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
    case "FETCH_TOUR_SUCCESS":
      return {
        ...state,
        fullDescription: {
          id: action.payload.id,
          title: action.payload.title,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          description: action.payload.description,
          price: action.payload.price,
          includes: action.payload.includes,
          company: action.payload.company,
          image: action.payload.image,
          seats: action.payload.seats,
        },
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

    case "ADD_USER_SUCCESS":
      return {
        ...state,
        isLoggedin: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        isLoggedin: true,
      };
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        isLoggedin: false,
      };
    case "ADD_TOUR":
      return {
        ...state,
        newBooking: { ...state.newBooking, tour: action.payload },
      };
    case "ADD_FIRST_NAME":
      return {
        ...state,
        newBooking: { ...state.newBooking, firstName: action.payload },
      };
    case "ADD_LAST_NAME":
      return {
        ...state,
        newBooking: { ...state.newBooking, lastName: action.payload },
      };
    case "ADD_EMAIL":
      return {
        ...state,
        newBooking: { ...state.newBooking, email: action.payload },
      };
    case "ADD_PHONE":
      return {
        ...state,
        newBooking: { ...state.newBooking, phone: action.payload },
      };
    case "BOOK_SEATS":
      return {
        ...state,
        newBooking: { ...state.newBooking, seats: action.payload },
      };

    case "CLEAR_BOOKING_INFO":
      return {
        ...state,
        newBooking: {
          firstName: null,
          lastName: null,
          seats: null,
          tour: null,
          email: null,
          phone: null,
        },
      };
    case "CLEAR_NEW_TOUR_INFO":
      return {
        ...state,
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
