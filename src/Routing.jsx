// import { Route, Router, Routes, createBrowserRouter } from "react-router-dom";
// import Floor from "./pages/Floor";
// import Ward_Cabin from "./pages/Ward_Cabin";
// import NurseStation from "./pages/NurseStation";
// import Bed from "./pages/Bed";
// import Doctor from "./pages/Doctor";
// import Patient from "./pages/Patient";
// import PatientCallingRemote from "./pages/PatientCallingRemote";
// import HomeLayout from "./pages/HomeLayout";
// import LoginForm from "./components/LoginForm";
// import PrivateRoute from "./PrivateRoute";

// // const router = createBrowserRouter([
// //   {
// //     index: true,
// //     path: "/login",
// //     element: <LoginForm />,
// //   },
// //   {
// //     path: "/",
// //     element: <HomeLayout />,
// //     children: [
// //       // {
// //       //   path: "/login",
// //       //   element: <LoginForm />,
// //       // },
// //       {
// //         path: "/",
// //         element: (
// //           <PrivateRoute>
// //             <Dashboard />
// //           </PrivateRoute>
// //         ),
// //       },
// //       {
// //         path: "/floor",
// //         element: (
// //           <PrivateRoute>
// //             <Floor />
// //           </PrivateRoute>
// //         ),
// //         // errorElement: <ErrorPage />,
// //       },
// //       {
// //         path: "/ward",
// //         element: (
// //           <PrivateRoute>
// //             <Ward_Cabin />
// //           </PrivateRoute>
// //         ),
// //         // errorElement: <ErrorPage />,
// //       },
// //       {
// //         path: "/nurse_station",
// //         element: (
// //           <PrivateRoute>
// //             <NurseStation />
// //           </PrivateRoute>
// //         ),
// //         // errorElement: <ErrorPage />,
// //       },
// //       {
// //         path: "/bed",
// //         element: (
// //           <PrivateRoute>
// //             <Bed />
// //           </PrivateRoute>
// //         ),
// //         // errorElement: <ErrorPage />,
// //       },
// //       {
// //         path: "/doctor",
// //         element: (
// //           <PrivateRoute>
// //             <Doctor />
// //           </PrivateRoute>
// //         ),
// //         // errorElement: <ErrorPage />,
// //       },
// //       {
// //         path: "/patient",
// //         element: (
// //           <PrivateRoute>
// //             <Patient />
// //           </PrivateRoute>
// //         ),
// //         // errorElement: <ErrorPage />,
// //       },
// //       {
// //         path: "/patient_calling_remote",
// //         element: (
// //           <PrivateRoute>
// //             <PatientCallingRemote />
// //           </PrivateRoute>
// //         ),
// //         // errorElement: <ErrorPage />,
// //       },
// //     ],
// //     // errorElement: <ErrorPage />,
// //   },
// // ]);

// const router = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="login" element={<LoginForm />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/" element={<HomeLayout />}>
//             <Route path="floor" element={<Floor />} />
//             <Route path="ward" element={<Ward_Cabin />} />
//             <Route path="nurse_station" element={<NurseStation />} />
//             <Route path="bed" element={<Bed />} />
//             <Route path="doctor" element={<Doctor />} />
//             <Route path="patient" element={<Patient />} />
//             <Route
//               path="patient_calling_remote"
//               element={<PatientCallingRemote />}
//             />
//           </Route>
//         </Route>
//         <Route path="*" element={<p>Nothing here. Go back.</p>} />
//       </Routes>
//     </Router>
//   );
// };

// export default router;
