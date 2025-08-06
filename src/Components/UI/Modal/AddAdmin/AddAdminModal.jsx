import { Button, ConfigProvider, Form, Input, Modal, Typography } from "antd";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";
import { useCreateAdminMutation } from "../../../../redux/features/adminManagement/adminManagementApi";

const AddAdminModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const [addAdmin] = useCreateAdminMutation();
  const [form] = Form.useForm();

  const handleSave = async (values) => {
    const res = await tryCatchWrapper(
      addAdmin,
      { body: values },
      "Adding Admin..."
    );
    if (res) {
      form.resetFields();
      setIsAddModalOpen(false);
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
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            facilities: ["Boost voucher to popular"],
          }}
          onFinish={handleSave}
          className=" mt-7"
        >
          <Typography.Title level={5}>Admin Name</Typography.Title>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
            style={{ fontWeight: "500" }}
          >
            <Input
              placeholder="Enter name"
              className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Typography.Title level={5}>Admin Email</Typography.Title>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
            style={{ fontWeight: "500" }}
          >
            <Input
              type="email"
              placeholder="Enter email"
              className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Typography.Title level={5}>Admin Password</Typography.Title>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
            style={{ fontWeight: "500" }}
          >
            <Input.Password
              type="password"
              placeholder="Enter password"
              className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
            >
              Add Admin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddAdminModal;
