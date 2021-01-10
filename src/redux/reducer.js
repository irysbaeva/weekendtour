let initialState = {
  tours: [],
  loading: true,
  error: null,
  title: null,
  startDate: null,
  endDate: null,
  description: null,
  price: null,
  includes: null,
  company:null,
  newTour: {
    title: null,
    startDate: null,
    endDate: null,
    description: null,
    price: null,
    includes: null,
    company:null
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
        title: action.payload,
      };
    case "ADD_START_DATE":
      return {
        ...state,
        startDate: action.payload,
      };
    case "ADD_END_DATE":
      return {
        ...state,
        endDate: action.payload,
      };
    case "ADD_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "ADD_PRICE":
      return {
        ...state,
        price: action.payload,
      };
    case "ADD_INCLUDES":
      return {
        ...state,
        includes: action.payload,
      };
    case "ADD_COMPANY":
      return {
        ...state,
        company: action.payload,
      };

    case "ADD_NEW_TOUR":
      return {
        ...state,
        newTour: {
          title: state.title,
          startDate: state.startDate,
          endDate: state.endDate,
          description: state.description,
          price: state.price,
          includes: state.includes,
          company:state.company
        },
      };

    case "UPDATE_TOURS":
      return {
        ...state,
        newTour: {
          title: null,
          startDate: null,
          endDate: null,
          description: null,
          price: null,
          includes: null,
          company: null
        },

        tours: updateTours(state.tours, {
          title: state.newTour.title, startDate: state.newTour.startDate,
          endDate: state.newTour.endDate,
          description: state.newTour.description,
          price: state.newTour.price,
          includes: state.newTour.includes,
          company: state.newTour.company},state.tours.length)
        
     
      };
    default:
      return state;
  }
};
export default reducer;
