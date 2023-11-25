import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import ErrorPage from "../error-page";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SignUp/SingUp";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Funding from "../Pages/Fundings/Fundings";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Blogs from "../Pages/Blogs/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/donation-requests", element: <DonationRequests /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/funding", element: <Funding /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/singUp",
    element: <SingUp />,
  },
]);

export default router;
