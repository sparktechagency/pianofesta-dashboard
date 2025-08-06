import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const inspirationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInspiration: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: "/inspiration",
        params: {
          page,
          limit,
          searchTerm,
        },
      }),
      providesTags: [tagTypes.inspiration],
    }),
    deleteInspiration: builder.mutation({
      query: ({ id }) => ({
        url: `/inspiration/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.inspiration],
    }),

    createInspiration: builder.mutation({
      query: (req) => ({
        url: "/inspiration/create",
        method: "POST",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.inspiration],
    }),

    updateInspiration: builder.mutation({
      query: (req) => ({
        url: `/inspiration/update/${req?.params}`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.inspiration],
    }),

    getInspirationCategory: builder.query({
      query: ({ page, limit }) => ({
        url: "/category/inspiration",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.inspiration],
    }),
  }),
});

export const {
  useGetInspirationQuery,
  useGetInspirationCategoryQuery,
  useDeleteInspirationMutation,
  useCreateInspirationMutation,
  useUpdateInspirationMutation,
} = inspirationApi;
