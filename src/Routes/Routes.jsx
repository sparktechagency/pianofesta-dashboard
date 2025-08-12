/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../Pages/Auth/SignIn";
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import OtpPage from "../Pages/Auth/OtpPage";
import UpdatePassword from "../Pages/Auth/UpdatePassword";

import NotFoundPage from "../Components/ui/NotFound/NotFound";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";
import { decodedToken } from "../utils/jwt";
import Cookies from "js-cookie";
import Loading from "../Components/ui/Loading";

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("pianofesta_accessToken");

    if (token) {
      const user = decodedToken(token || "");

      if (user && user.role === "admin") {
        navigate(`/${user.role}/overview`, { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    } else {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // Optionally display a loading indicator
  return <Loading />;
}

const router = createBrowserRouter([
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "forgot-password/otp-verify",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
