"use client";
import { Input, Tooltip } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetConversationListQuery } from "../../redux/features/conversation/conversationApi";
import { FadeLoader } from "react-spinners";
import ConversationChatListCard from "./ConversationChatListCard";
import {
  selectSelectedChatUser,
  setOnlineUsers,
} from "../../redux/features/conversation/conversationSlice";
import useUserData from "../../hooks/useUserData";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socket-context";
import { BsFillPlusCircleFill } from "react-icons/bs";
import CreateConversationModal from "./CreateConversationModal";

const ConversationChatList = ({ userData, onlineUsers }) => {
  const user = useUserData();
  const socket = useSocket()?.socket;
  const dispatch = useDispatch();
  const [isViewCreateModal, setIsViewCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const seletedConversation = useSelector(selectSelectedChatUser);
  const [chatList, setChatList] = useState([]);

  console.log("chatList", chatList);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetConversationListQuery(
      {},
      {
        skip: !userData?.userId,
      }
    );

  const handleNewMessage = useCallback(
    (payload) => {
      // Payload is an array of chat objects with last message and counts
      const chats = Array.isArray(payload) ? payload : [payload];

      const normalized = chats.map((item) => {
        const otherUser =
          item.chat.users.find((u) => u._id !== user?.userId) || {};
        return {
          _id: item.chat._id,
          otherUser: {
            id: otherUser._id,
            name: otherUser.name || otherUser.sureName || otherUser.email,
            image: otherUser.profileImage,
          },
          lastMessage: {
            text: item.message,
            updatedAt: item.lastMessageCreatedAt,
          },
          unreadMessageCount: item.unreadMessageCount,
        };
      });

      // Sort descending by lastMessage.updatedAt
      normalized.sort((a, b) => {
        const dateA = new Date(a.lastMessage.updatedAt || 0).getTime();
        const dateB = new Date(b.lastMessage.updatedAt || 0).getTime();
        return dateB - dateA;
      });

      setChatList(normalized);
    },
    [user?.userId]
  );

  useEffect(() => {
    if (!socket) {
      console.warn("❌ Socket not ready yet.");
      return;
    }

    socket.on(`chat-list::${user?.userId}`, handleNewMessage);
    socket.on("onlineUser", (online) => {
      console.log("Online Users:", online);
      dispatch(setOnlineUsers(online));
    });

    return () => {
      socket.off(`chat-list::${user?.userId}`, handleNewMessage);
      socket.off("onlineUser");
    };
  }, [dispatch, handleNewMessage, socket, user?.userId]);

  useEffect(() => {
    if (allChatList?.data) {
      const normalized = allChatList.data.map((item) => {
        const otherUser =
          item.chat.users.find((u) => u._id !== user?.userId) || {};
        return {
          _id: item.chat._id,
          otherUser: {
            id: otherUser._id,
            name: otherUser.name || otherUser.sureName || otherUser.email,
            image: otherUser.profileImage,
          },
          lastMessage: {
            text: item.message,
            updatedAt: item.lastMessageCreatedAt,
          },
          unreadMessageCount: item.unreadMessageCount,
        };
      });
      setChatList(normalized);
    }
  }, [allChatList?.data, user?.userId]);

  const filteredConversations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return chatList
      .filter((conversation) => {
        if (!term) return true; // no search => keep all
        const name = conversation.otherUser.name?.toLowerCase() || "";
        return name.includes(term);
      })
      .sort((a, b) => {
        const dateA = new Date(a?.lastMessage?.updatedAt || 0).getTime();
        const dateB = new Date(b?.lastMessage?.updatedAt || 0).getTime();
        return dateB - dateA;
      });
  }, [chatList, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const showCreateModal = () => {
    setIsViewCreateModal(true);
  };

  const handleCancel = () => {
    setIsViewCreateModal(false);
  };

  return (
    <div
      className={`w-full lg:w-[400px] overflow-y-auto px-3 ${
        seletedConversation ? "hidden lg:block" : "block lg:block"
      }`}
    >
      <div className="sticky top-0 z-20   py-5 mb-3 !bg-primary-color">
        <div className=" flex justify-between items-center pe-4  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold mt-3">
          <p>Messages</p>
          <Tooltip placement="left" title="Create New Conversation">
            <BsFillPlusCircleFill
              onClick={showCreateModal}
              className="text-secondary-color cursor-pointer text-sm sm:text-base md:text-xl lg:text-2xl"
            />
          </Tooltip>
        </div>
        <Input
          placeholder="Search Conversations"
          prefix={<SearchOutlined className="text-[#F88D58] text-xl" />}
          className="!bg-[#EFEFEF] text-base-color mt-2 !py-3 !px-2 w-full"
          onChange={handleSearch}
        />
      </div>
      {isAllChatFeacthing ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#28314E" />
        </div>
      ) : (
        <div className="md:h-full h-fit mb-3">
          <div className=" text-gray-300 bg-white   ">
            {filteredConversations.map((conversation) => (
              <ConversationChatListCard
                key={conversation._id}
                conversation={conversation}
                imageUrlSrc={conversation.otherUser.image}
                onlineUsers={onlineUsers}
              />
            ))}
          </div>
        </div>
      )}
      <CreateConversationModal
        isModalOpen={isViewCreateModal}
        setIsModalOpen={setIsViewCreateModal}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default ConversationChatList;
