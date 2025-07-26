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
      providesTags: [tagTypes.userManagement],
    }),
    businessUser: builder.query({
      query: () => {
        return {
          url: "/users/all-business-users",
          method: "GET",
        };
      },
      providesTags: [tagTypes.userManagement],
    }),
    businessUserById: builder.query({
      query: ({ id }) => {
        return {
          url: `/business/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.userManagement],
    }),
    blockUnblockUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.userManagement],
    }),
  }),
});

export const {
  useRegularUserQuery,
  useBusinessUserQuery,
  useBusinessUserByIdQuery,
  useBlockUnblockUserMutation,
} = userManagementApi;
