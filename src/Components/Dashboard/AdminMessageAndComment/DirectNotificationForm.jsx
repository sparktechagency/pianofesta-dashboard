import { Button, Form, Input, Typography } from "antd";

const DirectNotification = () => {
  const [form] = Form.useForm();

  const handleSave = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className=" mt-7"
      >
        <Typography.Title level={5}>Name</Typography.Title>
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
        <Typography.Title level={5}>Message</Typography.Title>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please input the message!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input.TextArea
            rows={5}
            placeholder="Enter message"
            className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
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
