import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 1. Importe o Toaster
import "./index.css";

import Login from "./pages/Login.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import PrivateRoute from "./componentes/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/tarefa/:id",
    element: (
      <PrivateRoute>
        <TaskDetails />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
