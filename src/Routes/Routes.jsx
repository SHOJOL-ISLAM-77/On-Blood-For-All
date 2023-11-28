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
import Profile from "../Pages/Profile/Profile";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import SearchPage from "../Pages/Search/Search";
import DashboardDonationRequest from "../Pages/DashboardDonationRequest/DashboardDonationRequest";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/donation-requests", element: <DonationRequests /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/funding", element: <Funding /> },
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
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/create-donation-request",
        element: (
          <PrivateRoute>
            <DashboardDonationRequest />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
