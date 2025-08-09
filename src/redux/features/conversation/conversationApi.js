import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const conversationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConversationList: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `/chat/my-chat-list`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.conversation],
    }),
    createConversation: build.mutation({
      query: (req) => ({
        url: `/chat/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.conversation],
    }),
    getConversationMessageList: build.query({
      query: ({ id, page, limit }) => ({
        url: `/message/${id}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const {
  useGetConversationListQuery,
  useCreateConversationMutation,
  useGetConversationMessageListQuery,
} = conversationApi;

export default conversationApi;
