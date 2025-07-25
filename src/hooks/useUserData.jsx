// hooks/useUserData.ts
import { useMemo } from "react";
import Cookies from "js-cookie";
import { decodedToken } from "../utils/jwt";

const useUserData = () => {
  const token = Cookies.get("pianofesta_accessToken");

  const user = useMemo(() => {
    if (!token) return null;

    const decoded = decodedToken(token);
    return decoded;
  }, [token]);

  return user;
};

export default useUserData;
