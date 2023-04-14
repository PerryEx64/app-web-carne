import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./AdminPage";
import SideBar from "./components/SideBar";
import { Provider } from "react-redux";
import "./index.css";
import store from "./app/storeSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./assets/Account";
import Client from "./client";
import AddInfoCards from "./client/AddInfoCards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/user",
    element: <Client />,
    children: [
      {
        path: "addInfoCards",
        element: <AddInfoCards />,
      },
    ],
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
