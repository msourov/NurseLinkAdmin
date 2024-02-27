import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Floor from "./pages/Floor";
import Ward_Cabin from "./pages/Ward_Cabin";
import NurseStation from "./pages/NurseStation";
import Bed from "./pages/Bed";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import PatientCallingRemote from "./pages/PatientCallingRemote";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      {/* <RouterProvider router={router}>
        <HomeLayout />
      </RouterProvider> */}
      <Router>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomeLayout />}>
              <Route path="floor" element={<Floor />} />
              <Route path="ward" element={<Ward_Cabin />} />
              <Route path="nurse_station" element={<NurseStation />} />
              <Route path="bed" element={<Bed />} />
              <Route path="doctor" element={<Doctor />} />
              <Route path="patient" element={<Patient />} />
              <Route
                path="patient_calling_remote"
                element={<PatientCallingRemote />}
              />
            </Route>
          </Route>
          <Route path="*" element={<p>Nothing here. Go back.</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
