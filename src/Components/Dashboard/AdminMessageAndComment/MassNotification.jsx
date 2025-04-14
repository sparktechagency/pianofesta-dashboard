import { Button, Form, Input, Select, Typography } from "antd";

const { Option } = Select;

const MassNotification = () => {
  const [form] = Form.useForm();

  const handleSave = async (values) => {
    console.log(values);
  };

  return (
    <div className="">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="space-y-5"
      >
        {/* Dropdown for Location */}
        <Typography.Title level={5}>Location</Typography.Title>
        <Form.Item
          name="location"
          rules={[{ required: true, message: "Please select a location!" }]}
          style={{ fontWeight: "500" }}
        >
          <Select
            placeholder="All of Italy"
            className="font-medium h-12 border !border-secondary-color rounded-md"
          >
            <Option value="italy">All of Italy</Option>
            <Option value="rome">Rome</Option>
            <Option value="milan">Milan</Option>
          </Select>
        </Form.Item>

        {/* Dropdown for Categories */}
        <Typography.Title level={5}>Categories</Typography.Title>
        <Form.Item
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
          style={{ fontWeight: "500" }}
        >
          <Select
            placeholder="All Categories"
            className="font-medium h-12 border !border-secondary-color rounded-md"
          >
            <Option value="all">All Categories</Option>
            <Option value="events">Events</Option>
            <Option value="business">Business</Option>
          </Select>
        </Form.Item>

        {/* Dropdown for Event Types */}
        <Typography.Title level={5}>Event Types</Typography.Title>
        <Form.Item
          name="eventType"
          rules={[{ required: true, message: "Please select an event type!" }]}
          style={{ fontWeight: "500" }}
        >
          <Select
            placeholder="All Event Types"
            className="font-medium h-12 border !border-secondary-color rounded-md"
          >
            <Option value="all">All Event Types</Option>
            <Option value="conference">Conference</Option>
            <Option value="webinar">Webinar</Option>
          </Select>
        </Form.Item>

        {/* Dropdown for Behaviors */}
        <Typography.Title level={5}>Behaviors</Typography.Title>
        <Form.Item
          name="behavior"
          rules={[{ required: true, message: "Please select a behavior!" }]}
          style={{ fontWeight: "500" }}
        >
          <Select
            placeholder="All Behaviors"
            className="font-medium h-12 border !border-secondary-color rounded-md"
          >
            <Option value="all">All Behaviors</Option>
            <Option value="positive">Positive</Option>
            <Option value="negative">Negative</Option>
          </Select>
        </Form.Item>

        {/* Email Input */}
        <Typography.Title level={5}>Email</Typography.Title>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="font-medium h-12 border !border-secondary-color rounded-md text-xl"
          />
        </Form.Item>

        {/* Message Input */}
        <Typography.Title level={5}>Message</Typography.Title>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input.TextArea
            rows={5}
            placeholder="Type Your Message Here"
            className="font-medium h-12 border !border-secondary-color rounded-md text-xl"
          />
        </Form.Item>

        {/* Send Button */}
        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full h-12 !bg-gradient-to-b from-[#8F59F9] to-[#6A0DAD] border !border-secondary-color !text-white text-base sm:text-lg font-bold rounded-md"
          >
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MassNotification;
