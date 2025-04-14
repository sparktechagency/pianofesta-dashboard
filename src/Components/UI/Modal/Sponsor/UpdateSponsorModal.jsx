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

const UpdateSponsorManagementModal = ({
  isEditModalVisible,
  handleCancel,
  // eslint-disable-next-line no-unused-vars
  currentRecord,
}) => {
  const { Option } = Select;
  const { Panel } = Collapse;

  // Using a simple string array for feature state
  const [feature, setFeature] = useState([""]);
  const [options, setOptions] = useState([0]); // Using numbers just to track count/index
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

  const handleAddOption = () => {
    setOptions((prev) => [...prev, prev.length]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);

      const fields = form.getFieldsValue();
      const newFields = { ...fields };
      newFields.options?.splice(index, 1); // remove index from form values
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
            colorTextHeading: "#222222",
            colorBorder: "#222222",
            colorText: "#222222",
            borderRadiusLG: 0,
            headerPadding: "12px 20px",
            contentBg: "rgb(255,255,255)",
            headerBg: "rgb(255,255,255)",
          },
        },
      }}
    >
      <Modal open={isEditModalVisible} onCancel={handleCancel} footer={null}>
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

          <Typography.Title level={5}>Options</Typography.Title>

          <Collapse accordion className="bg-primary-color">
            {options.map((_, index) => (
              <Panel
                key={`option-${index}`}
                header={`Option ${index + 1}`}
                extra={
                  options.length > 1 && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <MdDelete className="size-5" />
                    </button>
                  )
                }
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Typography.Title level={5}>
                      Priority Level
                    </Typography.Title>
                    <Form.Item
                      name={["options", index, "priority"]}
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
                        {[...Array(12)].map((_, i) => (
                          <Option key={i + 1} value={`${i + 1}`}>{`${
                            i + 1
                          } Month${i === 0 ? "" : "s"}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <div>
                    <Typography.Title level={5}>Add Price</Typography.Title>
                    <Form.Item
                      name={["options", index, "price"]}
                      rules={[
                        { required: true, message: "Please input the Price!" },
                      ]}
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
                      name={["options", index, "expiration"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the Expiration!",
                        },
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
                      name={["options", index, "time"]}
                      rules={[
                        { required: true, message: "Please select a Time!" },
                      ]}
                      style={{ fontWeight: "500" }}
                    >
                      <Select
                        placeholder="Select Time"
                        className="font-medium h-12 !text-base-color !placeholder:text-[##B5B5B5] border !border-secondary-color rounded-md"
                      >
                        {[1, 2, 3, 4, 5].map((time) => (
                          <Option key={time} value={`${time}`}>
                            {time}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </Panel>
            ))}
          </Collapse>

          <Button
            block
            onClick={handleAddOption}
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
            className="!mt-3"
          >
            <PlusOutlined />
            Add More Option
          </Button>

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

export default UpdateSponsorManagementModal;
