import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "App";
import { AuthContextProvider } from "context/authContext";
import { ToastProvider } from "utils/toast-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
