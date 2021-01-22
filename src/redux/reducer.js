let initialState = {
  tours: [],
  loading: true,
  error: null,
  newTour: {
    id: null,
    title: null,
    startDate: null,
    endDate: null,
    description: null,
    price: null,
    includes: null,
    company: null,
     image: null
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
    image:null
  }
 
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
          image: action.payload.image
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

    default:
      return state;
  }
};
export default reducer;
