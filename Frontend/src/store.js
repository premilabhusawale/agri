import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './States/Auth/Reducer'   // ← import the auth reducer

const rootReducer = combineReducers({
  auth: authReducer,   // ← registered as "auth" — matches useSelector(s => s.auth)
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export default store