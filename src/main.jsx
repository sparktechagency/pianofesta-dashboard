if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}

import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import Main from "./Components/Layout/Main";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
