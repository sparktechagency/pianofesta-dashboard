/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import { getBaseUrl } from "../../helpers/config/envConfig";
import { getFromLocalStorage } from "../../utils/localStorage";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("pianofesta_accessToken");
    const signUpToken = getFromLocalStorage("pianofesta_createUserToken");

    const changePassToken = Cookies.get("pianofesta_forgetToken");
    const forgetOtpMatchToken = Cookies.get("pianofesta_forgetOtpMatchToken");

    if (token) {
      headers.set("token", `${token}`);
    }

    if (signUpToken) {
      headers.set("SignUpToken", `signUpToken ${signUpToken}`);
    }

    if (changePassToken) {
      headers.set("token", `${changePassToken}`);
    }
    if (forgetOtpMatchToken) {
      headers.set("token", `${forgetOtpMatchToken}`);
    }

    return headers;
  },
});

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     const res = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     if (data?.data?.accessToken) {
//       const user = api.getState().auth.user;

//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
