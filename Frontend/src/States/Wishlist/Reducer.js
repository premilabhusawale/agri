import * as types from './Types'

const initialState = {
  items: [],      // array of { product: {...} } — matches your backend response
  loading: false,
  error: null
}

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_WISHLIST_REQUEST:
    case types.ADD_WISHLIST_REQUEST:
    case types.REMOVE_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null }

    // All 3 success cases replace items with the full updated wishlist
    // because your backend returns the full wishlist on every operation
    case types.GET_WISHLIST_SUCCESS:
    case types.ADD_WISHLIST_SUCCESS:
    case types.REMOVE_WISHLIST_SUCCESS:
      return { ...state, loading: false, items: action.payload }

    case types.GET_WISHLIST_FAIL:
    case types.ADD_WISHLIST_FAIL:
    case types.REMOVE_WISHLIST_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default wishlistReducer