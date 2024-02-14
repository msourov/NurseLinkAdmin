import { RouterProvider } from "react-router-dom";
import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import router from "./Routing";

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <HomeLayout />
      </RouterProvider>
    </>
  );
}

export default App;
