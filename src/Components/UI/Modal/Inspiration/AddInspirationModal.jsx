import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Typography,
  Upload,
} from "antd";

const AddInspirationModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
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
          <Typography.Title level={5}>Title</Typography.Title>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
            style={{ fontWeight: "500" }}
          >
            <Input
              placeholder="Enter Title"
              className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Typography.Title level={5}> Description</Typography.Title>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
            style={{ fontWeight: "500" }}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter description"
              className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Typography.Title level={5}>Cover Image</Typography.Title>
          <Form.Item
            rules={[{ required: true, message: "Please upload an image!" }]}
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
                <div className="">Upload Image</div>
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddInspirationModal;
