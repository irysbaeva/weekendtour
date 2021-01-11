import {createStore, compose, applyMiddleware} from "redux";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const middleware = composeEnchancer(
    applyMiddleware(thunk)
);

const store = createStore(reducer, middleware);
export default store;