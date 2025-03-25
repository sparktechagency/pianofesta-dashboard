import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

const AddSponsorManagementModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { Option } = Select;
  const { Panel } = Collapse;

  // Using a simple string array for feature state
  const [feature, setFeature] = useState([""]);
  const [activeKey, setActiveKey] = useState([0]);
  const [form] = Form.useForm();

  // Handle adding a new feature (string)
  const handleAdd = () => {
    form
      .validateFields()
      .then(() => {
        const newFeature = [...feature, ""];
        setFeature(newFeature);
        setActiveKey([String(newFeature.length - 1)]); // Ensure key is string
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  // Handle removing a feature
  const handleRemove = (index) => {
    if (feature.length > 1) {
      const newFeature = feature.filter((_, i) => i !== index);
      setFeature(newFeature);
      setActiveKey([String(Math.max(0, index - 1))]); // Ensure key is string and update activeKey
      const fields = form.getFieldsValue();
      const newFields = { ...fields };
      delete newFields.features[index]; // Adjust to match feature form field
      form.setFieldsValue(newFields);
    }
  };

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
          Collapse: {
            colorTextHeading: "#6A0DAD",
            colorBorder: "#6A0DAD",
            colorText: "#6A0DAD",
            borderRadiusLG: 0,
            headerPadding: "12px 20px",
            contentBg: "rgb(255,255,255)",
            headerBg: "rgb(255,255,255)",
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
          className="mt-7"
        >
          <Typography.Title level={5}>Package Title</Typography.Title>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input the Package title!" },
            ]}
            style={{ fontWeight: "500" }}
          >
            <Input
              placeholder="Enter package title"
              className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
            />
          </Form.Item>

          <Typography.Title level={5}>Sponsor Type</Typography.Title>
          <Form.Item
            name="sponsorType"
            rules={[{ required: true, message: "Please select a sponsor!" }]}
            style={{ fontWeight: "500" }}
          >
            <Select
              placeholder="Sponsor Type"
              className="font-medium h-12 !text-base-color !placeholder:text-[##B5B5B5] border !border-secondary-color rounded-md "
            >
              <Option value="event">Event</Option>
              <Option value="business">Business</Option>
              <Option value="job">Job</Option>
            </Select>
          </Form.Item>

          <Collapse
            accordion
            activeKey={activeKey}
            onChange={setActiveKey}
            className="bg-primary-color"
          >
            {feature.map((feat, index) => (
              <Panel
                header={`Feature ${index + 1}`}
                key={String(index)} // Ensure key is string
                className="!text-base-color bg-primary-color flex flex-col gap-1"
                extra={
                  feature.length > 1 && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(index)}
                    >
                      <MdDelete className="size-5" />
                    </button>
                  )
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <p className="text-base-color text-lg font-medium">{`Feature`}</p>
                    <Form.Item
                      name={["features", index]} // Now using feature values directly
                      initialValue={feat}
                      rules={[
                        {
                          required: true,
                          message: "Please input the feature!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Type your feature"
                        className="font-medium h-10 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
                      />
                    </Form.Item>
                  </div>
                </div>
              </Panel>
            ))}
          </Collapse>

          <Button
            block
            onClick={handleAdd}
            style={{
              padding: "1px",
              fontSize: "20px",
              fontWeight: "500",
              color: "#6A0DAD",
              background: "#6A0DAD10",
              height: "40px",
              border: "1px solid #6A0DAD",
              marginBottom: "20px",
            }}
            className="!mt-5"
          >
            <PlusOutlined />
            Add More Feature
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Typography.Title level={5}>Priority Level</Typography.Title>
              <Form.Item
                name="priority"
                rules={[
                  {
                    required: true,
                    message: "Please select a Priority Level!",
                  },
                ]}
                style={{ fontWeight: "500" }}
              >
                <Select
                  placeholder="Select Priority Level"
                  className="font-medium h-12 !text-base-color !placeholder:text-[##B5B5B5] border !border-secondary-color rounded-md"
                >
                  <Option value="1">1 Month</Option>
                  <Option value="2">2 Months</Option>
                  <Option value="3">3 Months</Option>
                  <Option value="4">4 Months</Option>
                  <Option value="5">5 Months</Option>
                  <Option value="6">6 Months</Option>
                  <Option value="7">7 Months</Option>
                  <Option value="8">8 Months</Option>
                  <Option value="9">9 Months</Option>
                  <Option value="10">10 Months</Option>
                  <Option value="11">11 Months</Option>
                  <Option value="12">12 Months</Option>
                </Select>
              </Form.Item>
            </div>

            <div>
              <Typography.Title level={5}>Add Price</Typography.Title>
              <Form.Item
                name="price"
                rules={[{ required: true, message: "Please input the Price!" }]}
                style={{ fontWeight: "500" }}
              >
                <Input
                  placeholder="Enter Price"
                  className="font-medium h-12  !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
                />
              </Form.Item>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Typography.Title level={5}>Expiration</Typography.Title>
              <Form.Item
                name="expiration"
                rules={[
                  { required: true, message: "Please input the Expiration!" },
                ]}
                style={{ fontWeight: "500" }}
              >
                <Input
                  placeholder="Enter Expiration"
                  className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5}>Time</Typography.Title>
              <Form.Item
                name="time"
                rules={[{ required: true, message: "Please select a Time!" }]}
                style={{ fontWeight: "500" }}
              >
                <Select
                  placeholder="Select Time"
                  className="font-medium h-12 !text-base-color !placeholder:text-[##B5B5B5] border !border-secondary-color rounded-md"
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddSponsorManagementModal;
