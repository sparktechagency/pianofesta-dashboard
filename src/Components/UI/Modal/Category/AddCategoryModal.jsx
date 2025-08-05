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
import { useAddSubCategoryMutation } from "../../../../redux/features/categories/categoriesApi";
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

const AddCategoryModal = ({ activeTab, isAddModalOpen, setIsAddModalOpen }) => {
  const [form] = Form.useForm();
  const [addSubCategory] = useAddSubCategoryMutation();

  const handleSave = async (values) => {
    console.log(values);

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        name: values.name,
        type: values.type, // ensure the Form.Item uses `type` not `categoryType`
        description: values.description,
      })
    );
    if (values.icon?.file) {
      formData.append("icon", values.icon?.file);
    }
    if (values.image?.file) {
      formData.append("banner", values.image?.file);
    }

    const res = await tryCatchWrapper(
      addSubCategory,
      { body: formData },
      "Adding Subcategory..."
    );

    if (res?.statusCode === 201) {
      setIsAddModalOpen(false);
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
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        title={
          <Typography.Title level={4}>Add New Subcategory</Typography.Title>
        }
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
              <Form.Item className="relative w-full" name="icon">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  maxCount={1}
                  accept="image/*"
                  className=""
                  listType="picture"
                >
                  <Button
                    style={{
                      zIndex: 1,
                    }}
                    className=" text-base sm:text-lg  !bg-secondary-color !text-secondary-color w-full !bg-secondary-color/10 border !border-dashed !border-secondary-color rounded-md flex items-center justify-center !py-5"
                  >
                    <div className="">Upload Icon</div>
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          )}
          {activeTab === "inspiration" && (
            <div>
              <Typography.Title level={5}>Subcategory Image</Typography.Title>
              <Form.Item className="relative w-full" name="image">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  maxCount={1}
                  accept="image/*"
                  className=""
                  listType="picture"
                >
                  <Button
                    style={{
                      zIndex: 1,
                    }}
                    className=" text-base sm:text-lg  !bg-secondary-color !text-secondary-color w-full !bg-secondary-color/10 border !border-dashed !border-secondary-color rounded-md flex items-center justify-center !py-5"
                  >
                    <div className="">Upload Image</div>
                  </Button>
                </Upload>
              </Form.Item>
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
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddCategoryModal;
