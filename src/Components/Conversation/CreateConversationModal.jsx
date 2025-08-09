import { Button, ConfigProvider, Form, Modal, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import tryCatchWrapper from "../../utils/TryCatchWraper";
import { useCreateConversationMutation } from "../../redux/features/conversation/conversationApi";
import { useGetAllUserNameQuery } from "../../redux/features/sendNotification/sendNotificationApi";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const CreateConversationModal = ({ isModalOpen, setIsModalOpen }) => {
  const [createConversation] = useCreateConversationMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //   const { data: admin, isFetching: adminFetching } = useGetProfileQuery();

  // Call API only with debounced search term
  const { data, isFetching } = useGetAllUserNameQuery({
    page: 1,
    limit: 20,
    searchTerm: debouncedSearchTerm,
  });

  const userNames = data?.data?.result || [];

  const handleSave = async (values) => {
    const payload = {
      users: [values.userId],
    };

    const res = await tryCatchWrapper(
      createConversation,
      { body: payload },
      "Creating Conversation..."
    );
    if (res?.statusCode === 201) {
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#F9FAFB",
            headerBg: "#F9FAFB",
          },
        },
      }}
    >
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={
          <Typography.Title level={4}>
            Create a New Conversation
          </Typography.Title>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-5"
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

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
            >
              Create Conversation
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default CreateConversationModal;
