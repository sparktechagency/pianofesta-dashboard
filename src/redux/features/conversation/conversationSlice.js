import { createSlice } from "@reduxjs/toolkit";

// Define types for each part of the state

// Initial state
const initialState = {
  onlineUser: [],
  typingUser: false,
  selectedChatUser: null,
  chatMessages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUser = action.payload;
    },
    setTypingUser: (state, action) => {
      state.typingUser = action.payload;
    },
    setSelectedChatUser: (state, action) => {
      state.selectedChatUser = action.payload;
    },
    clearSelectedChatUser: (state) => {
      state.selectedChatUser = null;
    },
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
  },
});

// Action creators
export const {
  setOnlineUsers,
  setTypingUser,
  setSelectedChatUser,
  clearSelectedChatUser,
  setChatMessages,
} = conversationSlice.actions;

// Selectors
export const selectOnlineUsers = (state) => state.conversation.onlineUser;
export const selectTypingUser = (state) => state.conversation.typingUser;
export const selectSelectedChatUser = (state) =>
  state.conversation.selectedChatUser;
export const selectChatMessages = (state) => state.conversation.chatMessages;

// Export reducer
export default conversationSlice.reducer;
