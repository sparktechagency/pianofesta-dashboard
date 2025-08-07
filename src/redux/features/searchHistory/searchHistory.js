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
  }),
});

export const { useGetSearchHistoryQuery } = searchHistoryApi;
