import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk';
import { devTools } from 'redux-devtools'
import { routeReducer } from 'redux-simple-router'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

export default compose(
  applyMiddleware(thunk),
  devTools()
)(createStore)(reducer);
