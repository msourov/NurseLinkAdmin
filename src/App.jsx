import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Floor from "./pages/Floor";
import Ward_Cabin from "./pages/Ward_Cabin";
import NurseStation from "./pages/NurseStation";
import Bed from "./pages/Bed";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import { isLoggedIn } from "./features/authentication/loginSlice";
import Remote from "./pages/Remote";

function App() {
  const isAuthenticated = useSelector(isLoggedIn);
  return (
    <>
      {/* <RouterProvider router={router}>
        <HomeLayout />
      </RouterProvider> */}
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route path="*" element={<Navigate to="/" replace />} />
          ) : (
            <Route path="login" element={<LoginForm />} />
          )}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomeLayout />}>
              <Route path="floor" element={<Floor />} />
              <Route path="ward" element={<Ward_Cabin />} />
              <Route path="nurse_station" element={<NurseStation />} />
              <Route path="bed" element={<Bed />} />
              <Route path="doctor" element={<Doctor />} />
              <Route path="patient" element={<Patient />} />
              <Route path="remote" element={<Remote />} />
            </Route>
          </Route>
          <Route path="*" element={<p>Nothing here. Go back.</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
