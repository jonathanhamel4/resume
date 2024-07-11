import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <Navigate replace to="/" />,
  },
  {
    path: "/en",
    element: <App locale="en" />,
    errorElement: <Navigate replace to="/" />,
  },
  {
    path: "/fr",
    element: <App locale="fr" />,
    errorElement: <Navigate replace to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
