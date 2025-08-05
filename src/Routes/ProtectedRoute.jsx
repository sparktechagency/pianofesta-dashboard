import { decodedToken } from "../utils/jwt";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children, role }) {
  const token = Cookies.get("pianofesta_accessToken");

  if (token) {
    const user = decodedToken(token || "");

    if (!user || user.role !== role) {
      return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
  } else {
    return <Navigate to="/signin" replace />;
  }
}

export default ProtectedRoute;
