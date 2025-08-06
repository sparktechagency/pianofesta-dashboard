import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query({
      query: ({ page, limit }) => ({
        url: "/report",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.report],
    }),
    deleteReport: builder.mutation({
      query: (req) => ({
        url: `/report/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.report],
    }),
  }),
});

export const { useGetReportQuery, useDeleteReportMutation } = reportApi;
