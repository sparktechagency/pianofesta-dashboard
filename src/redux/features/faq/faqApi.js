import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: (params) => ({
        url: "/faq",
        params,
      }),
      providesTags: [tagTypes.faq],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    deleteFaq: builder.mutation({
      query: ({ id, index }) => ({
        url: `/faq/${id}`,
        method: "DELETE",
        body: { index },
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
