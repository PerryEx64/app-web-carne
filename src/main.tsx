import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./AdminPage";
import Account from "./assets/Account";
import SideBar from "./components/SideBar";
import { Provider } from "react-redux";
import "./index.css";
import store from "./app/storeSlice";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Account />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <SideBar />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "client",
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
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
