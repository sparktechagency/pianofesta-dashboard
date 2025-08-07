import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  DatePicker,
  InputNumber,
} from "antd";
import { useEffect } from "react";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";
import { useUpdatePromotionsMutation } from "../../../../redux/features/promotions/promotionsApi";
import dayjs from "dayjs";

const EditPromotionModal = ({
  isEditModalOpen,
  handleCancel,
  currentRecord,
}) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [updatePromotion] = useUpdatePromotionsMutation();

  // Populate form with currentRecord values
  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        name: currentRecord.name,
        discountPrice: currentRecord.discountPrice,
        startDate: dayjs(currentRecord.startDate),
        endDate: dayjs(currentRecord.endDate),
        appliesTo: currentRecord.appliesTo,
        usageLimit: currentRecord.usageLimit,
      });
    }
  }, [currentRecord, form]);

  // Handle form submission
  const handleSave = async (values) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
    };

    const res = await tryCatchWrapper(
      updatePromotion,
      { params: currentRecord._id, body: formattedValues },
      "Updating Promotion..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
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
        open={isEditModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          className="mt-7"
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Typography.Title level={5}>Coupon Code</Typography.Title>
          <Form.Item
            name="name"
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
            name="discountPrice"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
              {
                type: "number",
                min: 1,
                max: 100,
                message: "Discount must be between 1 and 100!",
              },
            ]}
          >
            <InputNumber
              placeholder="e.g., 10"
              min={1}
              max={100}
              className="w-full font-medium h-12 text-base placeholder:text-[#B5B5B5] border border-secondary-color rounded-md !text-center"
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
            <InputNumber
              min={1}
              className="w-full font-medium h-12 text-base border border-secondary-color rounded-md !text-center"
              placeholder="e.g., 100"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base font-bold"
            >
              Update Coupon
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default EditPromotionModal;
