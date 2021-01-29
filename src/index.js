import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import tourService from "./tour-service";
import { TourServiceProvider } from "./tour-service-context";
import App from "./components/App";
import ErrorBoundry from "./components/error-boundry";
import store from "./store";


ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <TourServiceProvider value={tourService}>
          <Router>
            <App />
          </Router>
        </TourServiceProvider>
      </ErrorBoundry>
    </Provider>
  /* </React.StrictMode> */
  ,
  document.getElementById("root")
);
