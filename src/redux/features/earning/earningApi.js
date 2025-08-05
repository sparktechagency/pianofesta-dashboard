import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allEarning: builder.query({
      query: () => {
        return {
          url: "/subscriptionPayment/earning",
          method: "GET",
        };
      },
      providesTags: [tagTypes.earning],
    }),
  }),
});

export const { useAllEarningQuery } = listingApi;
