import { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { BsImage } from "react-icons/bs";
import { FaTelegramPlane, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { selectSelectedChatUser } from "../../redux/features/conversation/conversationSlice";
import { getBaseUrl } from "../../helpers/config/envConfig";
import { useSelector } from "react-redux";
import SpinnerLoader from "../UI/SpinLoading";
import Cookies from "js-cookie";
// import useUserData from "../../hooks/useUserData";

const ConversationSendMessage = ({ socket }) => {
  const token = Cookies.get("pianofesta_accessToken");
  const selectedConversation = useSelector(selectSelectedChatUser);
  const serverUrl = getBaseUrl();
  const [form] = Form.useForm();
  // const userData = useUserData();
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [textValue, setTextValue] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // Reset on new conversation
  useEffect(() => {
    setFileList([]);
    setUploadedImageUrls([]);
    form.setFieldValue("message", "");
  }, [selectedConversation?._id, form]);

  // Manually trigger batch upload
  const handleImageSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setFileList(files);
    setIsUploadLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file); // multiple append calls for multiple images
    });

    try {
      const response = await axios.post(
        `${serverUrl}/message/file-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );

      if (response?.data?.data?.length > 0) {
        setUploadedImageUrls(response.data.data); // array of uploaded URLs
      }
    } catch (error) {
      toast.error("Failed to upload images");
    }

    setIsUploadLoading(false);
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...fileList];
    const updatedUrls = [...uploadedImageUrls];
    updatedFiles.splice(index, 1);
    updatedUrls.splice(index, 1);
    setFileList(updatedFiles);
    setUploadedImageUrls(updatedUrls);
  };

  const handleMessageSend = async (values) => {
    const data = {
      chatId: selectedConversation?._id,
      ...(values?.message?.length > 0 ? { text: values?.message } : {}),
      ...(uploadedImageUrls.length > 0 ? { images: uploadedImageUrls } : {}),
    };
    try {
      socket?.emit("send-message", data, (res) => {
        if (res?.success) {
          setFileList([]);
          setUploadedImageUrls([]);
          form.resetFields();
          setTextValue(null);
        }
      });
      socket?.emit("my-chat-list", {}, () => {});
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to send message",
        { duration: 2000 }
      );
    }
  };

  // const hanleTyping = async () => {
  //   const message = {
  //     chatId: selectedConversation?._id,
  //     fullName: userData?.fullName,
  //   };

  //   try {
  //     socket?.emit("typing", message, () => {});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const hanleStopTyping = async () => {
  //   const message = {
  //     chatId: selectedConversation?._id,
  //     fullName: userData?.fullName,
  //   };

  //   try {
  //     socket?.emit("stopTyping", message, () => {});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div className="w-full">
        {/* Show selected file names */}
        {fileList.length > 0 && (
          <div className="absolute bottom-10 left-4 bg-white border border-gray-300 rounded px-3 py-1 flex gap-2 shadow">
            {fileList.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border-b last:border-none pb-1 last:pb-0 relative"
              >
                {/*     */}
                <img
                  className="w-20 h-20"
                  src={URL.createObjectURL(file)}
                  alt="Selected File"
                />
                {isUploadLoading ? (
                  <SpinnerLoader
                    svgClassName="w-4 h-4"
                    className=" absolute top-0.5 right-0.5"
                  />
                ) : (
                  <FaTimes
                    className="cursor-pointer text-red-600 absolute top-0.5 right-0.5"
                    style={{ fontSize: "16px" }}
                    onClick={() => handleDeleteImage(index)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <Form form={form} onFinish={handleMessageSend}>
          <div className="!bg-white absolute -bottom-5 flex justify-center items-center w-full p-1">
            <div className="w-full rounded-full bg-white border border-secondary-color px-4 py-2 flex items-center space-x-4">
              <Form.Item className="w-full !p-0 !m-0" name="message">
                <Input
                  // onFocus={() => hanleTyping()}
                  // onBlur={() => hanleStopTyping()}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Send your message..."
                  className="!border-none !ring-0 !outline-none !bg-transparent text-black"
                />
              </Form.Item>

              <Form.Item className="!p-0 !m-0" name="image">
                <label className="cursor-pointer flex items-center">
                  <BsImage className="text-xl text-secondary-color mt-1" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }} // completely hides default file input
                    onChange={handleImageSelect}
                  />
                </label>
              </Form.Item>
            </div>

            {isUploadLoading ? (
              <div className="p-2">
                <SpinnerLoader svgClassName="w-6 h-6" />
              </div>
            ) : (
              <button
                disabled={!textValue?.length && uploadedImageUrls.length === 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                type="submit"
              >
                <FaTelegramPlane className="text-[#F9DD40] bg-secondary-color rounded-full p-2 text-4xl ms-3" />
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConversationSendMessage;
