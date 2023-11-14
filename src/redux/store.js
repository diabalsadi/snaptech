// Redux core
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
// Slices
import user from './slices/user'
import cart from './slices/cart'

const reducer = combineReducers({
  user: user.reducer,
  cart: cart.reducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
