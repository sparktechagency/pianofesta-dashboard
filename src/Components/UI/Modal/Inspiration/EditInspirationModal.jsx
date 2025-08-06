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
import {
  useGetInspirationCategoryQuery,
  useUpdateInspirationMutation,
} from "../../../../redux/features/inspiration/inspirationAPi";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";

const EditInspirationModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [editInspiration] = useUpdateInspirationMutation();

  const { data: categoryData, isFetching } = useGetInspirationCategoryQuery(
    {
      page: 1,
      limit: 9999999,
    },
    {
      skip: !isEditModalOpen,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        title: currentRecord?.title,
        description: currentRecord?.description,
        category: currentRecord?.category?._id,
        image: [
          {
            uid: "-1",
            name: "cover.jpg",
            status: "done",
            url: currentRecord?.coverImage,
          },
        ],
      });
    }
  }, [currentRecord, form]);

  const handleSave = async (values) => {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title: values.title,
        description: values.description,
        category: values.category,
      })
    );

    const file = values.image?.file || values.image?.[0]?.originFileObj;
    if (file) {
      formData.append("cover", file);
    }

    const res = await tryCatchWrapper(
      editInspiration,
      {
        params: currentRecord?._id,
        body: formData,
      },
      "Editing Inspiration..."
    );

    if (res?.statusCode === 200) {
      setIsEditModalOpen(false);
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
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <h1 className="text-2xl font-bold py-4 text-secondary-color">
          Edit Blog
        </h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-7"
        >
          <Typography.Title level={5}>Title</Typography.Title>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input
              placeholder="Enter Title"
              className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Typography.Title level={5}>Category</Typography.Title>
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select
              loading={isFetching}
              placeholder="Select Category"
              className="font-medium h-12 border !border-secondary-color rounded-md"
            >
              {categoryData?.data?.data?.map((item) => (
                <Select.Option key={item?._id} value={item?._id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Typography.Title level={5}>Description</Typography.Title>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter description"
              className="font-medium !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Typography.Title level={5}>Cover Image</Typography.Title>
          <Form.Item
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture"
              defaultFileList={
                currentRecord?.coverImage
                  ? [
                      {
                        uid: "-1",
                        name: "cover.jpg",
                        status: "done",
                        url: currentRecord?.coverImage,
                      },
                    ]
                  : []
              }
            >
              <Button className="text-base sm:text-lg !bg-secondary-color !text-secondary-color w-full !bg-secondary-color/10 border !border-dashed !border-secondary-color rounded-md flex items-center justify-center !py-5">
                Upload Image
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default EditInspirationModal;
