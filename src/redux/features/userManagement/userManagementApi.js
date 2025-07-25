import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    regularUser: builder.query({
      query: () => {
        return {
          url: "/users/all-users",
          method: "GET",
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
    businessUser: builder.query({
      query: () => {
        return {
          url: "/users/all-business-users",
          method: "GET",
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useRegularUserQuery, useBusinessUserQuery } = userManagementApi;
