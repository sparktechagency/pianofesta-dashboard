import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => {
        return {
          url: "/users/dashboard",
          method: "GET",
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
    getUserRatio: builder.query({
      query: ({ role, year }) => {
        return {
          url: "/users/users-overview",
          method: "GET",
          params: {
            role,
            year,
          },
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
    getEarningRatio: builder.query({
      query: ({ year }) => {
        return {
          url: "/users/earning-overview",
          method: "GET",
          params: {
            year,
          },
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
    getNotification: builder.query({
      query: ({ page, limit }) => {
        return {
          url: "notifications/my-notifications",
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetUserRatioQuery,
  useGetEarningRatioQuery,
  useGetNotificationQuery,
} = dashboardApi;
