import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { gfatStore } from "./components/store";
import App from "./app";
import "./App.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={gfatStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
