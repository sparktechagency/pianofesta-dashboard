import { useState, useEffect } from "react";
import { Form, Input, Upload } from "antd";
import { BsImage } from "react-icons/bs";
import { FaTelegramPlane, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { selectSelectedChatUser } from "../../redux/features/conversation/conversationSlice";
import { getBaseUrl } from "../../helpers/config/envConfig";
import { useSelector } from "react-redux";
import SpinnerLoader from "../UI/SpinLoading";

const ConversationSendMessage = ({ socket }) => {
  const selectedConversation = useSelector(selectSelectedChatUser);
  const serverUrl = getBaseUrl();
  const [form] = Form.useForm();
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [textValue, setTextValue] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Reset on new conversation
  useEffect(() => {
    setFileList([]);
    setUploadedImageUrl(null);
    form.setFieldValue("message", "");
  }, [selectedConversation?._id, form]);

  // Handle image selection
  const handleImageChange = ({ fileList: newFileList }) => {
    const latestFile = newFileList?.[0];
    setFileList(latestFile ? [latestFile] : []);
    if (latestFile) uploadImage(latestFile);
  };

  const uploadImage = async (file) => {
    setIsUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file.originFileObj);

    try {
      const response = await axios.post(
        `${serverUrl}/users/file_upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data?.data?.file) {
        setUploadedImageUrl(response?.data?.data?.file);
      }
    } catch (error) {
      toast.error("Failed to upload image");
    }
    setIsUploadLoading(false);
  };

  const handleDeleteImage = () => {
    setFileList([]);
    setUploadedImageUrl(null);
    setIsUploadLoading(false);
  };

  const handleMessageSend = async (values) => {
    const data = {
      chatId: selectedConversation?._id,
      ...(values?.message?.length > 0 ? { text: values?.message } : {}),
      ...(uploadedImageUrl ? { file: uploadedImageUrl } : {}),
    };
    try {
      socket?.emit("send-message", data, (res) => {
        if (res?.success) {
          setFileList([]);
          setUploadedImageUrl(null);
          form.resetFields();
          setTextValue(null);
        }
      });
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to send message",
        { duration: 2000 }
      );
    }
  };

  return (
    <div>
      <div className="w-full">
        {/* Show selected file name instead of image preview */}
        {fileList.length > 0 && (
          <div className="absolute bottom-10 left-4 bg-white border border-gray-300 rounded px-3 py-1 flex items-center gap-2 shadow">
            <span className="text-sm font-medium text-gray-800">
              {fileList[0]?.name?.slice(0, 50)}
            </span>
            <FaTimes
              className="cursor-pointer text-red-600"
              style={{ fontSize: "16px" }}
              onClick={handleDeleteImage}
            />
          </div>
        )}

        <Form form={form} onFinish={handleMessageSend}>
          <div className="!bg-white absolute -bottom-5 flex justify-center items-center w-full p-1">
            <div className="w-full rounded-full bg-white border border-secondary-color px-4 py-2 flex items-center space-x-4">
              <Form.Item className="w-full !p-0 !m-0" name="message">
                <Input
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Send your message..."
                  className="!border-none !ring-0 !outline-none !bg-transparent text-black"
                />
              </Form.Item>

              <Form.Item className="!p-0 !m-0" name="image">
                <Upload
                  fileList={fileList}
                  onChange={handleImageChange}
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  maxCount={1}
                  showUploadList={false}
                >
                  <BsImage className="cursor-pointer text-xl text-secondary-color mt-1" />
                </Upload>
              </Form.Item>
            </div>

            {isUploadLoading ? (
              <SpinnerLoader />
            ) : (
              <button
                disabled={!textValue?.length && !uploadedImageUrl}
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
