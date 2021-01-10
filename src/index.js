import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import TourService from "./tour-service";
import { TourServiceProvider } from "./tour-service-context";
import App from "./components/App";
import ErrorBoundry from "./components/error-boundry";
const tourService = new TourService();

const store = createStore(reducer);

ReactDOM.render(
    <React.StrictMode>
  <Provider store={store}>
    <ErrorBoundry>
      <TourServiceProvider value={tourService}>
        <Router>
          <App />
        </Router>
      </TourServiceProvider>
    </ErrorBoundry>
  </Provider>,
    </React.StrictMode>,
  document.getElementById("root")
);
