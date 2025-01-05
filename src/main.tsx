import { createRoot } from "react-dom/client";
import "./index.css";
import "./main.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./helpers/redux/store.ts";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
