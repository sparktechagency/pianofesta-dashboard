import { Card, Layout, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socket-context";
import {
  selectSelectedChatUser,
  setSelectedChatUser,
} from "../../redux/features/conversation/conversationSlice";
import { useGetConversationMessageListQuery } from "../../redux/features/conversation/conversationApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import { FadeLoader } from "react-spinners";
import ConversationMessageCard from "./ConversationMessageCard";
import ConversationSendMessage from "./ConversationSendMessage";

const ConversationMessage = ({ userData, onlineUsers }) => {
  const imageUrl = getImageUrl();
  const socket = useSocket()?.socket;
  const dispatch = useDispatch();
  const selectedConversation = useSelector(selectSelectedChatUser);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [messages, setMessages] = useState([]);

  // State to force refetch on back click
  const [refreshKey, setRefreshKey] = useState(0);

  const queryArg = selectedConversation?._id
    ? { id: selectedConversation._id, refreshKey }
    : undefined;

  const {
    data: allMessages,
    isFetching,
    refetch,
  } = useGetConversationMessageListQuery(queryArg, {
    skip: !selectedConversation?._id,
    refetchOnMountOrArgChange: true,
  });

  // When conversation changes, clear messages and refetch
  useEffect(() => {
    if (!selectedConversation?._id) return;
    setMessages([]);
    refetch();
  }, [selectedConversation?._id, refetch, refreshKey]);

  // When messages fetched, update state
  useEffect(() => {
    if (allMessages?.data) {
      setMessages(allMessages.data);
    }
  }, [allMessages?.data]);

  // Scroll helper function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  // Scroll immediately on conversation change (to catch cases where messages haven't updated yet)
  useEffect(() => {
    console.log("Bal falao");
    scrollToBottom();
  });

  // Incoming socket message handler
  const handleMessage = useCallback(
    (message) => {
      const newMessage = {
        text: message?.message,
        sender: message?.sender,
        chat: selectedConversation?._id,
        createdAt: message?.createdAt,
      };
      setMessages((prev) => [...prev, newMessage]);

      // Scroll after new message arrives (small delay)
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    },
    [selectedConversation?._id]
  );

  // Join and leave socket rooms
  useEffect(() => {
    const roomId = selectedConversation?._id;
    if (!roomId || !socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", roomId.toString());
    socket.on(`message_received::${roomId}`, handleMessage);

    return () => {
      socket.off(`message_received::${roomId}`, handleMessage);
      socket.emit("leave", roomId);
    };
  }, [socket, selectedConversation?._id, handleMessage]);

  // Sort messages ascending by createdAt
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const onlineUserSet = new Set(onlineUsers?.map(([id]) => id?.toString()));

  // Back button clears chat and triggers refreshKey to force refetch next time
  const handleBackClick = () => {
    dispatch(setSelectedChatUser(null));
    setMessages([]);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div
      className={`w-full overflow-y-auto ${
        selectedConversation ? "block lg:block" : "hidden lg:block"
      }`}
      ref={containerRef}
    >
      {selectedConversation ? (
        <Layout className="py-6 px-2 !bg-[#FFFAF5] lg:col-span-3 xl:col-span-4 h-full">
          {/* Header */}
          <div className="!bg-[#FFFFFF] p-2 lg:p-4 border-b-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MdOutlineArrowBackIosNew
                onClick={handleBackClick}
                className="text-2xl cursor-pointer text-secondary-color"
              />
              <div className="flex items-center gap-2">
                <img
                  loading="lazy"
                  className="h-12 w-12 object-cover rounded-full"
                  src={selectedConversation?.otherUser?.image}
                  alt="Profile"
                />
                <span className="font-bold text-base sm:text-lg lg:text-xl flex items-center gap-1">
                  {selectedConversation?.otherUser?.name}
                  <Tooltip title="Online">
                    {onlineUserSet.has(
                      selectedConversation?.otherUser?.id?.toString()
                    ) && (
                      <div className="size-2 rounded-full bg-green-500"></div>
                    )}
                  </Tooltip>
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <Content className="bg-white flex flex-col gap-5 relative">
            <Card className="!border-0 !pb-5 overflow-y-auto border-none h-full overflow-x-hidden">
              {isFetching ? (
                <div className="flex justify-center items-center h-[70vh]">
                  <FadeLoader />
                </div>
              ) : (
                sortedMessages.map((msg, i) => (
                  <ConversationMessageCard
                    key={msg._id ?? i}
                    msg={msg}
                    userData={userData}
                    imageUrl={imageUrl}
                    ref={
                      i === sortedMessages.length - 1 ? messagesEndRef : null
                    }
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </Card>

            {selectedConversation && (
              <ConversationSendMessage socket={socket} userData={userData} />
            )}
          </Content>
        </Layout>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 h-full">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Welcome to Messages
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Select a conversation from the sidebar to start messaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationMessage;
