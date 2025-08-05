import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const dataManagementForUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/settings/privacy`,
        method: "GET",
      }),
      providesTags: [tagTypes.dataManagementUser],
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/settings/termAndConditions`,
        method: "GET",
      }),
      providesTags: [tagTypes.dataManagementUser],
    }),
    getCookiesPolicy: builder.query({
      query: () => ({
        url: `/settings/cookiePolicy`,
        method: "GET",
      }),
      providesTags: [tagTypes.dataManagementUser],
    }),
    updateDataManagement: builder.mutation({
      query: (req) => ({
        url: `/settings`,
        method: "PUT",
        body: req,
      }),
      invalidatesTags: [tagTypes.dataManagementUser],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
  useGetCookiesPolicyQuery,
  useUpdateDataManagementMutation,
} = dataManagementForUserApi;
