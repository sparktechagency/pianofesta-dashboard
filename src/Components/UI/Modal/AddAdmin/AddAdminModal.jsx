import { Button, ConfigProvider, Form, Input, Modal, Typography } from "antd";

const AddAdminModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const [form] = Form.useForm();

  const handleSave = async (values) => {
    console.log(values);
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
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
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
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
            style={{ fontWeight: "500" }}
          >
            <Input
              type="email"
              placeholder="Enter email"
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
