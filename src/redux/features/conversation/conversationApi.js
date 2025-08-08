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
  useGetConversationMessageListQuery,
} = conversationApi;

export default conversationApi;
