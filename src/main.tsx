import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./AdminPage";
import Account from "./assets/Account";
import SideBar from "./components/SideBar";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Account />,
  },
  {
    path: "/admin",
    element: <SideBar />,
    children: [
      {
        path: "client",
        element: <AdminPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
