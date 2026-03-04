import {
  CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAILURE,
  GET_RATINGS_REQUEST, GET_RATINGS_SUCCESS, GET_RATINGS_FAILURE,
  UPDATE_RATING_REQUEST, UPDATE_RATING_SUCCESS, UPDATE_RATING_FAILURE,
  DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, DELETE_RATING_FAILURE,
} from './Types';

const initialState = {
  ratings: [],
  loading: false,
  error: null,
};

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RATING_REQUEST:
    case GET_RATINGS_REQUEST:
    case UPDATE_RATING_REQUEST:
    case DELETE_RATING_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_RATINGS_SUCCESS:
      return { ...state, loading: false, ratings: action.payload };

    case CREATE_RATING_SUCCESS:
      return { ...state, loading: false, ratings: [action.payload, ...state.ratings] };

    case UPDATE_RATING_SUCCESS:
      return {
        ...state, loading: false,
        ratings: state.ratings.map(r => r._id === action.payload._id ? action.payload : r),
      };

    case DELETE_RATING_SUCCESS:
      return {
        ...state, loading: false,
        ratings: state.ratings.filter(r => r._id !== action.payload),
      };

    case CREATE_RATING_FAILURE:
    case GET_RATINGS_FAILURE:
    case UPDATE_RATING_FAILURE:
    case DELETE_RATING_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default ratingReducer;