import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@redux/store"
import App from "./App";

import "./index.scss";
import { BrowserRouter } from "react-router-dom";

const element = document.getElementById("root");
if (!element) {
  throw new Error("root element not found");
}

const root = createRoot(element);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
