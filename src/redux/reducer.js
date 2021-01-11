let initialState = {
  tours: [],
  loading: true,
  error: null,
  newTour: {
    title: null,
    startDate: null,
    endDate: null,
    description: null,
    price: null,
    includes: null,
    company: null,
  },
};

const updateTours = (tours, item, idx) => {
  return [...tours.slice(0, idx), item];
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

    case "ADD_NEW_TOUR":
      return {
        ...state,
        newTour: {
          title: null,
          startDate: null,
          endDate: null,
          description: null,
          price: null,
          includes: null,
          company: null,
        },

        tours: updateTours(state.tours, state.newTour, state.tours.length),
      };

    default:
      return state;
  }
};
export default reducer;
