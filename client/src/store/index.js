import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import allReducer from "./reducers";

const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store