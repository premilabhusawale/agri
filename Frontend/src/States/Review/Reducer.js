import {
  CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILURE,
  GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAILURE,
  UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE,
} from './Types';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
    case GET_REVIEWS_REQUEST:
    case UPDATE_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload };

    case CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, reviews: [action.payload, ...state.reviews] };

    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state, loading: false,
        reviews: state.reviews.map(r => r._id === action.payload._id ? action.payload : r),
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state, loading: false,
        reviews: state.reviews.filter(r => r._id !== action.payload),
      };

    case CREATE_REVIEW_FAILURE:
    case GET_REVIEWS_FAILURE:
    case UPDATE_REVIEW_FAILURE:
    case DELETE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reviewReducer;