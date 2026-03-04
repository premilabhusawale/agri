import {
  GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE,
} from './Types';

const initialState = {
  cart: null,
  items: [],
  loading: false,   // ✅ always starts false
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    // ── GET CART ──
    case GET_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload.cart, items: action.payload.items ?? [] };
    case GET_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };   // ✅ loading resets on failure

    // ── ADD TO CART ──
    case ADD_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload.cart, items: action.payload.items ?? [] };
    case ADD_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };   // ✅ loading resets on failure

    // ── UPDATE CART ITEM ──
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };   // ✅ loading resets on failure

    // ── REMOVE CART ITEM ──
    case REMOVE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case REMOVE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };   // ✅ loading resets on failure

    default:
      return state;
  }
};

export default cartReducer;