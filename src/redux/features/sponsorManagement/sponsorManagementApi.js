import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const sponsorManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSponsorManagement: builder.query({
      query: ({ type }) => ({
        url: `/subscription/type/${type}`,
      }),
      providesTags: [tagTypes.sponsorManagement],
    }),

    createSponsorManagement: builder.mutation({
      query: (req) => ({
        url: "/subscription/create",
        method: "POST",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.sponsorManagement],
    }),

    updateSponsorManagement: builder.mutation({
      query: (req) => ({
        url: `/subscription/update/${req?.params}`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.sponsorManagement],
    }),

    deleteSponsorManagement: builder.mutation({
      query: ({ id }) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sponsorManagement],
    }),
  }),
});

export const {
  useGetSponsorManagementQuery,
  useCreateSponsorManagementMutation,
  useUpdateSponsorManagementMutation,
  useDeleteSponsorManagementMutation,
} = sponsorManagementApi;
