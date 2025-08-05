import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const dataManagementForAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessPrivacyPolicy: builder.query({
      query: () => ({
        url: `/settings/business/privacy`,
        method: "GET",
      }),
      providesTags: [tagTypes.dataManagementBusiness],
    }),
    getBusinessTermsAndConditions: builder.query({
      query: () => ({
        url: `/settings/business/termAndConditions`,
        method: "GET",
      }),
      providesTags: [tagTypes.dataManagementBusiness],
    }),
    getBusinessCookiesPolicy: builder.query({
      query: () => ({
        url: `/settings/business/cookiePolicy`,
        method: "GET",
      }),
      providesTags: [tagTypes.dataManagementBusiness],
    }),
    updateBusinessDataManagement: builder.mutation({
      query: (req) => ({
        url: `/settings/business`,
        method: "PUT",
        body: req,
      }),
      invalidatesTags: [tagTypes.dataManagementBusiness],
    }),
  }),
});

export const {
  useGetBusinessPrivacyPolicyQuery,
  useGetBusinessTermsAndConditionsQuery,
  useGetBusinessCookiesPolicyQuery,
  useUpdateBusinessDataManagementMutation,
} = dataManagementForAdminApi;
