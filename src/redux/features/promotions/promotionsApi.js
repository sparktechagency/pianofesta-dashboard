import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const promotionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query({
      query: () => ({
        url: "/coupon",
      }),
      providesTags: [tagTypes.promotions],
    }),

    createPromotions: builder.mutation({
      query: (req) => ({
        url: "/coupon/create",
        method: "POST",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.promotions],
    }),

    updatePromotions: builder.mutation({
      query: (req) => ({
        url: `/coupon/update/${req?.params}`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.promotions],
    }),
    togglePromotionsActive: builder.mutation({
      query: ({ id }) => ({
        url: `/coupon/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.promotions],
    }),
    deletePromotions: builder.mutation({
      query: ({ id }) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.promotions],
    }),
  }),
});

export const {
  useGetPromotionsQuery,
  useCreatePromotionsMutation,
  useUpdatePromotionsMutation,
  useTogglePromotionsActiveMutation,
  useDeletePromotionsMutation,
} = promotionsApi;
