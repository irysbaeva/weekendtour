import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage.js";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const middleware = composeEnhancer(
    applyMiddleware(thunk)
);
const persistedState = loadState();
const store = createStore(reducer, persistedState, middleware);


store.subscribe(() => {
  saveState(store.getState());
  console.log(store.getState());
  
});

export default store;
