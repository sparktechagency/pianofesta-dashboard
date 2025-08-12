import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const sendNotificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserName: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: "/users/all-users-nameList",
        params: {
          page,
          limit,
          searchTerm,
        },
      }),
      providesTags: [tagTypes.sendNotification],
    }),
    sendDirectNotification: builder.mutation({
      query: (req) => ({
        url: "/notification/direct",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.sendNotification],
    }),
    sendMassNotification: builder.mutation({
      query: (req) => ({
        url: "/notification/mass-notification",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.sendNotification],
    }),
    getAllCommunicationNotification: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: "/notification/mass",
        params: {
          page,
          limit,
          searchTerm,
        },
      }),
      providesTags: [tagTypes.sendNotification],
    }),
  }),
});

export const {
  useGetAllUserNameQuery,
  useSendDirectNotificationMutation,
  useSendMassNotificationMutation,
  useGetAllCommunicationNotificationQuery,
} = sendNotificationApi;
