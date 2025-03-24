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

const AddCategoryModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { Option } = Select;

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
          <Typography.Title level={5}>Category Name</Typography.Title>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
            style={{ fontWeight: "500" }}
          >
            <Input
              placeholder="Enter plan name"
              className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>
          <Typography.Title level={5}>Category Type</Typography.Title>
          <Form.Item
            name="categoryType"
            rules={[{ required: true, message: "Please select a category!" }]}
            style={{ fontWeight: "500" }}
          >
            <Select
              placeholder="Category Type"
              className="font-medium h-12 !text-base-color !placeholder:text-[##B5B5B5] border !border-secondary-color rounded-md "
            >
              <Option value="event">Event</Option>
              <Option value="business">Business</Option>
              <Option value="job">Job</Option>
            </Select>
          </Form.Item>
          <Typography.Title level={5}>Icon</Typography.Title>
          <Form.Item
            rules={[{ required: true, message: "Please upload an icon!" }]}
            className="relative w-full"
            name="image"
          >
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
                <div className="">Upload Service Icon</div>
              </Button>
            </Upload>
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
