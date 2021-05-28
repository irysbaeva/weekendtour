import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import ErrorBoundry from "./components/error-boundry";
import store from "./store";
import { ToastContainer } from "react-toastify";


ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ErrorBoundry>
      <Router>
        <ToastContainer />
        <App />
      </Router>
    </ErrorBoundry>
  </Provider>,
  /* </React.StrictMode> */
  document.getElementById("root")
);
