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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/floor",
        element: <Floor />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/ward",
        element: <Ward_Cabin />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/nurse_station",
        element: <NurseStation />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/bed",
        element: <Bed />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/doctor",
        element: <Doctor />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/patient",
        element: <Patient />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/patient_calling_remote",
        element: <PatientCallingRemote />,
        // errorElement: <ErrorPage />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
]);

export default router;
