import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Floor from "./pages/Floor";
import Ward_Cabin from "./pages/Ward_Cabin";
import NurseStation from "./pages/NurseStation";
import Bed from "./pages/Bed";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import PatientCallingRemote from "./pages/PatientCallingRemote";
import HomeLayout from "./pages/HomeLayout";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    index: true,
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/floor",
        element: (
          <PrivateRoute>
            <Floor />
          </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
      },
      {
        path: "/ward",
        element: (
          <PrivateRoute>
            <Ward_Cabin />
          </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
      },
      {
        path: "/nurse_station",
        element: (
          <PrivateRoute>
            <NurseStation />
          </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
      },
      {
        path: "/bed",
        element: (
          <PrivateRoute>
            <Bed />
          </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
      },
      {
        path: "/doctor",
        element: (
          <PrivateRoute>
            <Doctor />
          </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
      },
      {
        path: "/patient",
        element: (
          <PrivateRoute>
            <Patient />
          </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
      },
      {
        path: "/patient_calling_remote",
        element: (
          <PrivateRoute>
            <PatientCallingRemote />
          </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
]);

export default router;
