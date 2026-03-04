import { api } from '../../config/apiConfig';
import {
  CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAILURE,
  GET_RATINGS_REQUEST, GET_RATINGS_SUCCESS, GET_RATINGS_FAILURE,
  UPDATE_RATING_REQUEST, UPDATE_RATING_SUCCESS, UPDATE_RATING_FAILURE,
  DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, DELETE_RATING_FAILURE,
} from './Types';

export const createRating = (productId, rating) => async (dispatch) => {
  dispatch({ type: CREATE_RATING_REQUEST });
  try {
    const { data } = await api.post('/rating/create', { productId, rating });
    dispatch({ type: CREATE_RATING_SUCCESS, payload: data.data });
    return data.data;
  } catch (error) {
    dispatch({ type: CREATE_RATING_FAILURE, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

export const getRatings = (productId) => async (dispatch) => {
  dispatch({ type: GET_RATINGS_REQUEST });
  try {
    const { data } = await api.get(`/rating/${productId}`);
    dispatch({ type: GET_RATINGS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_RATINGS_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const updateRating = (ratingId, rating) => async (dispatch) => {
  dispatch({ type: UPDATE_RATING_REQUEST });
  try {
    const { data } = await api.put(`/rating/${ratingId}`, { rating });
    dispatch({ type: UPDATE_RATING_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: UPDATE_RATING_FAILURE, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

export const deleteRating = (ratingId) => async (dispatch) => {
  dispatch({ type: DELETE_RATING_REQUEST });
  try {
    await api.delete(`/rating/${ratingId}`);
    dispatch({ type: DELETE_RATING_SUCCESS, payload: ratingId });
  } catch (error) {
    dispatch({ type: DELETE_RATING_FAILURE, payload: error.response?.data?.message || error.message });
    throw error;
  }
};