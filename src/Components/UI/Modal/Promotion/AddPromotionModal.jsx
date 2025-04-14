import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  DatePicker,
} from "antd";

const AddPromotionModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  // Handle form submission
  const handleSave = async (values) => {
    console.log(values); // Handle save functionality here
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
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            appliesTo: "All Packs",
          }}
          onFinish={handleSave}
        >
          <Typography.Title level={5}>Create New Coupon</Typography.Title>
          <Form.Item
            name="couponCode"
            rules={[
              { required: true, message: "Please input the coupon code!" },
            ]}
          >
            <Input
              placeholder="e.g., ngtyfl"
              className="font-medium h-12 text-base placeholder:text-[#B5B5B5] border border-secondary-color rounded-md"
            />
          </Form.Item>

          <Typography.Title level={5}>Discount Percentage</Typography.Title>
          <Form.Item
            name="discountPercentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <Input
              placeholder="10%"
              className="font-medium h-12 text-base placeholder:text-[#B5B5B5] border border-secondary-color rounded-md"
            />
          </Form.Item>

          <Typography.Title level={5}>Start Date</Typography.Title>
          <Form.Item
            name="startDate"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker
              format="MM/DD/YYYY"
              className="w-full font-medium h-12 text-base border border-secondary-color rounded-md"
            />
          </Form.Item>

          <Typography.Title level={5}>End Date</Typography.Title>
          <Form.Item
            name="endDate"
            rules={[{ required: true, message: "Please select the end date!" }]}
          >
            <DatePicker
              format="MM/DD/YYYY"
              className="w-full font-medium h-12 text-base border border-secondary-color rounded-md"
            />
          </Form.Item>

          <Typography.Title level={5}>Applies To</Typography.Title>
          <Form.Item
            name="appliesTo"
            rules={[
              { required: true, message: "Please select the applicable pack!" },
            ]}
          >
            <Select
              placeholder="All Packs"
              className="font-medium h-12 text-base border border-secondary-color rounded-md"
            >
              <Option value="all">All Packs</Option>
              <Option value="business">Business Pack</Option>
              <Option value="event">Event Pack</Option>
              <Option value="job">Job Pack</Option>
            </Select>
          </Form.Item>

          <Typography.Title level={5}>Usage Limit</Typography.Title>
          <Form.Item
            name="usageLimit"
            rules={[
              { required: true, message: "Please input the usage limit!" },
            ]}
          >
            <Input
              type="number"
              placeholder="e.g., 100"
              min={1}
              className="w-full font-medium h-12 text-base border border-secondary-color rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 bg-secondary-color border border-secondary-color text-white text-base font-bold"
            >
              Create Coupon
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddPromotionModal;
