import React from "react";
import ReactDOM from "react-dom/client";

import "~/Environment";
import "~/GlobalVariables";

import { App } from "~/App";

import "./index.css";

export const isDevelopment = process.env.NODE_ENV === "development";

const main = async () => {
  const root = document.getElementById("app");
  root &&
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
};

main();
