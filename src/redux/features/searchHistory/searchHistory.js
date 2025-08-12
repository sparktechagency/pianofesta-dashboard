import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const searchHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchHistory: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: "/search",
        params: {
          page,
          limit,
          searchTerm,
        },
      }),
      providesTags: [tagTypes.searchHistory],
    }),
    getBusinessName: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: "/business/all-business-nameList",
        params: {
          page,
          limit,
          searchTerm,
        },
      }),
      providesTags: [tagTypes.searchHistory],
    }),
    sendBusinessNotification: builder.mutation({
      query: (req) => ({
        url: "/notification/search",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.searchHistory],
    }),
  }),
});

export const {
  useGetSearchHistoryQuery,
  useGetBusinessNameQuery,
  useSendBusinessNotificationMutation,
} = searchHistoryApi;
