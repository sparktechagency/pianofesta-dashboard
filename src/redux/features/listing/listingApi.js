import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    eventListing: builder.query({
      query: () => {
        return {
          url: "/event/list",
          method: "GET",
        };
      },
      providesTags: [tagTypes.listing],
    }),
    businessListing: builder.query({
      query: () => {
        return {
          url: "/business/list",
          method: "GET",
        };
      },
      providesTags: [tagTypes.listing],
    }),
  }),
});

export const { useEventListingQuery, useBusinessListingQuery } = listingApi;
