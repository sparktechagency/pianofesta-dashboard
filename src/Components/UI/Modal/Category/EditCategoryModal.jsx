import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  Upload,
} from "antd";
import { useEffect } from "react";
import { useUpdateSubCategoryMutation } from "../../../../redux/features/categories/categoriesApi";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";

const { Option } = Select;

const CATEGORY_TYPES = [
  { value: "Event", label: "Event" },
  { value: "Provider", label: "Provider" },
  { value: "job", label: "Job" },
  { value: "sopportedServices", label: "Supported Services" },
  { value: "extraServices", label: "Extra Services" },
  { value: "inspiration", label: "Inspiration" },
  { value: "community", label: "Community" },
];

const EditCategoryModal = ({
  activeTab,
  isEditModalOpen,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [updateSubCategory] = useUpdateSubCategoryMutation();

  // Set form values when modal opens or currentRecord changes
  useEffect(() => {
    if (isEditModalOpen && currentRecord) {
      form.setFieldsValue({
        name: currentRecord.name,
        description: currentRecord.description,
        type: currentRecord.type,
        // icon and image are handled separately by Upload components
      });
    }
  }, [isEditModalOpen, currentRecord, form]);

  const handleSave = async (values) => {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        name: values.name,
        type: values.type,
        description: values.description,
      })
    );

    if (values.icon?.file) {
      formData.append("icon", values.icon.file);
    }
    if (values.image?.file) {
      formData.append("banner", values.image.file);
    }

    const res = await tryCatchWrapper(
      updateSubCategory,
      { body: formData, params: currentRecord._id },
      "Updating Subcategory..."
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
        title={<Typography.Title level={4}>Edit Subcategory</Typography.Title>}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-5"
        >
          {activeTab !== "inspiration" && (
            <div>
              <Typography.Title level={5}>Subcategory Icon</Typography.Title>
              <Form.Item
                name="icon"
                className="relative w-full"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  accept="image/*"
                  listType="picture"
                  showUploadList={{ showRemoveIcon: true }}
                >
                  <Button className="text-base sm:text-lg !bg-secondary-color !text-secondary-color w-full !bg-secondary-color/10 border !border-dashed !border-secondary-color rounded-md flex items-center justify-center !py-5">
                    Upload Icon
                  </Button>
                </Upload>
              </Form.Item>
              <p className="mb-5">{currentRecord?.icon}</p>
            </div>
          )}
          {activeTab === "inspiration" && (
            <div>
              <Typography.Title level={5}>Subcategory Image</Typography.Title>
              <Form.Item
                name="image"
                className="relative w-full"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  accept="image/*"
                  listType="picture"
                  showUploadList={{ showRemoveIcon: true }}
                >
                  <Button className="text-base sm:text-lg !bg-secondary-color !text-secondary-color w-full !bg-secondary-color/10 border !border-dashed !border-secondary-color rounded-md flex items-center justify-center !py-5">
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>
              <p className="mb-5">{currentRecord?.banner}</p>
            </div>
          )}
          <Typography.Title level={5}>Subcategory Name</Typography.Title>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input the subcategory name!" },
            ]}
          >
            <Input
              placeholder="Enter subcategory name"
              className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-base !bg-input-color"
            />
          </Form.Item>
          <Typography.Title level={5}>Subcategory Description</Typography.Title>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input
              placeholder="Enter description"
              className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-base !bg-input-color"
            />
          </Form.Item>
          <Typography.Title level={5}>Category Type</Typography.Title>
          <Form.Item
            name="type"
            rules={[
              { required: true, message: "Please select a category type!" },
            ]}
          >
            <Select
              placeholder="Select category type"
              className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md"
            >
              {CATEGORY_TYPES.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
            >
              Update Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default EditCategoryModal;
