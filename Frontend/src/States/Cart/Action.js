import { api } from '../../config/apiConfig';
import {
  GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE,
} from './Types';

// ── GET USER CART ──
export const getUserCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await api.get('/cart/');
    dispatch({ type: GET_CART_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ── ADD TO CART ──
// ✅ getState guard prevents double-fire from StrictMode
// If a request is already in flight (loading: true), skip the second call entirely
export const addToCart = (productId, skuCode = null, weight = null) => async (dispatch, getState) => {
  const { loading } = getState().cart;
  if (loading) return; // ✅ StrictMode double-invoke guard

  dispatch({ type: ADD_TO_CART_REQUEST });
  try {
    const { data } = await api.put('/cart/add', { productId, skuCode, weight });
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ── UPDATE CART ITEM QUANTITY ──
export const updateCartItem = (cartItemId, quantity) => async (dispatch, getState) => {
  const { loading } = getState().cart;
  if (loading) return; // ✅ same guard

  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(`/cart/${cartItemId}`, { quantity });
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ── REMOVE CART ITEM ──
export const removeCartItem = (cartItemId) => async (dispatch, getState) => {
  const { loading } = getState().cart;
  if (loading) return; // ✅ same guard

  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
    await api.delete(`/cart/${cartItemId}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.response?.data?.error || error.message });
  }
};