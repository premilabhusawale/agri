import { api } from '../../config/apiConfig';
import {
  CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS, GET_USER_ORDERS_FAILURE,
  GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE,
  CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE,
} from './Types';

// ── CREATE ORDER FROM CART ──
export const createOrder = (shippingAddress) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post('/orders/create', { shippingAddress });
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.data });
    return data.data; // return so CheckOut can chain payment
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.response?.data?.error || error.message });
    throw error;
  }
};

// ── GET LOGGED-IN USER'S ORDERS ──
export const getUserOrders = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDERS_REQUEST });
  try {
    const { data } = await api.get('/orders/my-orders');
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_USER_ORDERS_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ── GET SINGLE ORDER BY ID ──
export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/orders/${orderId}`);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ── CANCEL ORDER ──
export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/orders/cancel/${orderId}`);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ── CREATE RAZORPAY PAYMENT LINK ──
// Called after order is created — returns { paymentLinkId, paymentUrl }
export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post(`/payment/create/${orderId}`);
    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data.data });
    return data.data; // { paymentLinkId, paymentUrl }
  } catch (error) {
    dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.response?.data?.error || error.message });
    throw error;
  }
};