import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './States/Auth/Reducer'
import productReducer from './States/Products/Reducer'
import cartReducer from './States/Cart/Reducer'
import orderReducer from './States/Orders/Reducer'
import ratingReducer from './States/Rating/Reducer'
import reviewReducer from './States/Review/Reducer'
import wishlistReducer from './States/Wishlist/Reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer, 
  ratings: ratingReducer,   
  reviews: reviewReducer,
 wishlist: wishlistReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export default store