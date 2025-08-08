import { formatDateTime } from "../../utils/dateFormet";
import ImagePreviewer from "../../utils/ImagePreviewer";

const ConversationMessageCard = ({ msg, userData, imageUrl }) => {
  return (
    <div>
      <div>
        <div className="flex items-start gap-1 mb-2">
          <div
            className={`flex items-center gap-2 w-full ${
              msg?.sender === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "justify-end"
                : msg?.sender !== null
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div>
              {msg?.file && (
                <div
                  className={`grid grid-cols-1  ${
                    msg?.images?.length > 2 ? " md:grid-cols-2" : "grid-cols-1"
                  } rounded-md ${
                    msg?.sender === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "w-fit ml-auto text-right text-white "
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  <ImagePreviewer
                    msg={msg}
                    imageUrl={imageUrl}
                    image={msg?.file}
                    userData={userData}
                  />
                </div>
              )}
              {msg?.text?.length > 0 && (
                <p
                  className={`py-1 px-3 mt-1 -ml-1 rounded-md ${
                    msg?.sender === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "w-fit !ml-auto text-right  text-white bg-secondary-color "
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.text}
                </p>
              )}

              {msg?.sender !== null && (
                <p
                  className={`text-[11px] mt-0.5 text-secondary-color ${
                    msg?.sender === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {formatDateTime(msg?.createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessageCard;
