import { Button, Form, Typography, Select, Input } from "antd";
import {
  useGetAllUserNameQuery,
  useSendDirectNotificationMutation,
} from "../../../redux/features/sendNotification/sendNotificationApi";
import { useState, useEffect } from "react";
import tryCatchWrapper from "../../../utils/TryCatchWraper";
import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import Loading from "../../ui/Loading";

// Simple debounce hook
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const DirectNotification = () => {
  const [sendDirectNotification] = useSendDirectNotificationMutation();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: admin, isFetching: adminFetching } = useGetProfileQuery();

  // Call API only with debounced search term
  const { data, isFetching } = useGetAllUserNameQuery({
    page: 1,
    limit: 20,
    searchTerm: debouncedSearchTerm,
  });

  const userNames = data?.data?.result || [];

  const [form] = Form.useForm();

  const handleSave = async (values) => {
    const payload = {
      message: {
        image: admin?.data?.profileImage, // static or from state
        text: values.message,
        name: admin?.data?.name, // you can change this dynamically if needed
      },
      receiverId: values.userId,
    };

    const res = await tryCatchWrapper(
      sendDirectNotification,
      { body: payload },
      "Sending Notification..."
    );
    if (res) {
      form.resetFields();
    }
  };

  if (adminFetching || isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="mt-7"
      >
        <Typography.Title level={5}>Name</Typography.Title>
        <Form.Item
          name="userId"
          rules={[{ required: true, message: "Please select a user!" }]}
          style={{ fontWeight: "500" }}
        >
          <Select
            showSearch
            placeholder="Select a user"
            optionFilterProp="children"
            loading={isFetching}
            onSearch={(value) => setSearchTerm(value)}
            filterOption={false} // API handles filtering
            className="h-12 font-medium"
          >
            {userNames.map((user) => (
              <Select.Option key={user._id} value={user._id}>
                {user.name || user.sureName || user.email}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Typography.Title level={5}>Message</Typography.Title>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please input the message!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input.TextArea
            rows={5}
            placeholder="Enter message"
            className="font-medium !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full h-12 !bg-gradient-to-b from-[#8F59F9] to-[#6A0DAD] border !border-secondary-color !text-white text-base sm:text-lg font-bold rounded-md"
          >
            Send Notification
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DirectNotification;
