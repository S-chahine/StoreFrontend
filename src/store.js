import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './components/Cart/cartReducer';
import loginReducer from './components/User/loginReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  cart: cartReducer,
  login: loginReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
