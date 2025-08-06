import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const adminManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: (params) => ({
        url: "/users/adminList",
        params,
      }),
      providesTags: [tagTypes.faq],
    }),
    createAdmin: builder.mutation({
      query: (req) => ({
        url: "/users/create/admin",
        method: "POST",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    deleteAdmin: builder.mutation({
      query: (req) => ({
        url: `/users/delete/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useGetAdminQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = adminManagementApi;
