import * as types from './Types'

// GET /api/v1/wishlist/get
export const getWishlist = () => async (dispatch) => {
  dispatch({ type: types.GET_WISHLIST_REQUEST })
  try {
    const res = await fetch('http://localhost:8585/api/v1/wishlist/get', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    })
    const data = await res.json()
    dispatch({ type: types.GET_WISHLIST_SUCCESS, payload: data.wishlist })
  } catch (error) {
    dispatch({ type: types.GET_WISHLIST_FAIL, payload: error.message })
  }
}

// POST /api/v1/wishlist/add
export const addToWishlist = (productId) => async (dispatch) => {
  dispatch({ type: types.ADD_WISHLIST_REQUEST })
  try {
    const res = await fetch('http://localhost:8585/api/v1/wishlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ productId })
    })
    const data = await res.json()
    dispatch({ type: types.ADD_WISHLIST_SUCCESS, payload: data.wishlist })
  } catch (error) {
    dispatch({ type: types.ADD_WISHLIST_FAIL, payload: error.message })
  }
}

// DELETE /api/v1/wishlist/:productId
export const removeFromWishlist = (productId) => async (dispatch) => {
  dispatch({ type: types.REMOVE_WISHLIST_REQUEST })
  try {
    const res = await fetch(`http://localhost:8585/api/v1/wishlist/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    })
    const data = await res.json()
    dispatch({ type: types.REMOVE_WISHLIST_SUCCESS, payload: data.wishlist })
  } catch (error) {
    dispatch({ type: types.REMOVE_WISHLIST_FAIL, payload: error.message })
  }
}