import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.min.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // Disable strict mode because it doesn't play well with React-Beautiful-DND
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
