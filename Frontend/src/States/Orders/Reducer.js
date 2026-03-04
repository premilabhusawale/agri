import {
  CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS, GET_USER_ORDERS_FAILURE,
  GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE,
  CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE,
} from './Types';

const initialState = {
  orders: [],           // all user orders
  currentOrder: null,   // single order (after create or getById)
  payment: null,        // { paymentLinkId, paymentUrl }
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    // ── CREATE ORDER ──
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null, currentOrder: null };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, currentOrder: action.payload };
    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ── GET USER ORDERS ──
    case GET_USER_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_USER_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case GET_USER_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ── GET ORDER BY ID ──
    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, currentOrder: action.payload };
    case GET_ORDER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ── CANCEL ORDER ──
    case CANCEL_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state, loading: false,
        orders: state.orders.map(o =>
          o._id === action.payload._id ? action.payload : o
        ),
      };
    case CANCEL_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ── CREATE PAYMENT ──
    case CREATE_PAYMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PAYMENT_SUCCESS:
      return { ...state, loading: false, payment: action.payload };
    case CREATE_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderReducer;