import { api } from '../../config/apiConfig';
import {
  CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILURE,
  GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAILURE,
  UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE,
} from './Types';

export const createReview = (productId, description) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const { data } = await api.post('/review/create', { productId, description });
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data.review });
    return data.review;
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.response?.data?.error || error.message });
    throw error;
  }
};

export const getReviews = (productId) => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_REQUEST });
  try {
    const { data } = await api.get(`/reviews/all/${productId}`);
    dispatch({ type: GET_REVIEWS_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({ type: GET_REVIEWS_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

export const updateReview = (reviewId, description) => async (dispatch) => {
  dispatch({ type: UPDATE_REVIEW_REQUEST });
  try {
    const { data } = await api.put(`/review/update/${reviewId}`, { description });
    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data.review });
  } catch (error) {
    dispatch({ type: UPDATE_REVIEW_FAILURE, payload: error.response?.data?.error || error.message });
    throw error;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });
  try {
    await api.delete(`/review/delete/${reviewId}`);
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.response?.data?.error || error.message });
    throw error;
  }
};