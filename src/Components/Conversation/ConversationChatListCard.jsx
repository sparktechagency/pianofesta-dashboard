import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedChatUser,
  setSelectedChatUser,
} from "../../redux/features/conversation/conversationSlice";
import { formatDateTime } from "../../utils/dateFormet";

const ConversationChatListCard = ({
  conversation,
  imageUrlSrc,
  onlineUsers,
}) => {
  console.log(onlineUsers);
  const dispatch = useDispatch();
  const selectedConversation = useSelector(selectSelectedChatUser);
  const handleConversationSelect = (conversation) => {
    // setSelectedConversation(conversation);
    dispatch(setSelectedChatUser(conversation));
  };

  return (
    <div
      onClick={() => handleConversationSelect(conversation)}
      className={`m-1 rounded  border-b border-gray-200 bg-[#DFEFFA] text-black ${
        conversation?._id === selectedConversation?._id
          ? "!bg-secondary-color text-white"
          : ""
      }`}
    >
      <div className="py-4 px-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            className="rounded-full aspect-square h-12 w-fit object-cover relative"
            src={imageUrlSrc}
            width={100}
            height={100}
            alt="Profile"
          />
          <div className="w-full mt-1">
            <div className="flex items-center gap-1 text-xl">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <p>
                    {conversation?.otherUser?.name?.length > 15
                      ? `${conversation?.otherUser?.name.slice(0, 15)}...`
                      : conversation?.otherUser?.name}
                  </p>
                  {onlineUsers?.some(
                    ([id]) => id === conversation?.otherUser?.id
                  ) && <div className="size-2 rounded-full bg-green-500"></div>}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="text-sm">
                {conversation?.lastMessage?.text
                  ? `${conversation?.lastMessage?.text.slice(0, 10)}...`
                  : ""}
              </div>
              <div className="text-xs">
                {conversation?.lastMessage?.updatedAt
                  ? formatDateTime(conversation?.lastMessage?.updatedAt)
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationChatListCard;
