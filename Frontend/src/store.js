import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({

})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export default store