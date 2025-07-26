import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subCategory: builder.query({
      query: ({ type, page, limit, searchTerm }) => {
        return {
          url: `/category/${type}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.userManagement],
    }),
    addSubCategory: builder.mutation({
      query: (req) => ({
        url: `/category/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.userManagement],
    }),
    updateSubCategory: builder.mutation({
      query: (req) => ({
        url: `/category/update/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.userManagement],
    }),
    deleteSubCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.userManagement],
    }),
    requestedCategory: builder.query({
      query: () => ({
        url: `/requestCategory`,
        method: "Get",
      }),
      providesTags: [tagTypes.userManagement],
    }),
  }),
});

export const {
  useSubCategoryQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useRequestedCategoryQuery,
} = categoriesApi;
