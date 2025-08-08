import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";
import { useCreateSponsorManagementMutation } from "../../../../redux/features/sponsorManagement/sponsorManagementApi";

const AddSponsorManagementModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const [createSponsorManagement] = useCreateSponsorManagementMutation();
  const { Option } = Select;
  const { Panel } = Collapse;

  // Using a simple string array for feature state
  const [feature, setFeature] = useState([""]);
  const [options, setOptions] = useState([0]); // Track count/index for options

  const [activeKey, setActiveKey] = useState([0]);
  const [form] = Form.useForm();

  // Handle adding a new feature
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
      setActiveKey([String(Math.max(0, index - 1))]);
      const fields = form.getFieldsValue();
      const newFields = { ...fields };
      if (newFields.features) {
        newFields.features.splice(index, 1);
      }
      form.setFieldsValue(newFields);
    }
  };

  // Add option
  const handleAddOption = () => {
    setOptions((prev) => [...prev, prev.length]);
  };

  // Remove option
  const handleRemoveOption = (index) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      const fields = form.getFieldsValue();
      const newFields = { ...fields };
      if (newFields.options) {
        newFields.options.splice(index, 1);
      }
      form.setFieldsValue(newFields);
    }
  };

  // Handle form submission
  const handleSave = async (values) => {
    const payload = {
      title: values.name,
      type: values.sponsorType,
      feature: values.features || [],
      options: (values.options || []).map((opt) => ({
        time: opt.time ? `${opt.time} Month` : "",
        price: Number(opt.price),
        expirationDays: Number(opt.expiration),
      })),
      priorityLevel: values.priorityLevel ? Number(values.priorityLevel) : 3,
      blueVerified:
        values.blueVerified === "true" || values.blueVerified === true,
    };

    const res = await tryCatchWrapper(
      createSponsorManagement,
      { body: payload },
      "Adding Sponsor..."
    );

    if (res?.statusCode === 201) {
      setIsAddModalOpen(false);
      form.resetFields();
      setFeature([""]);
      setOptions([0]);
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
          onFinish={handleSave}
          className="mt-7"
          initialValues={{
            features: [""],
            options: [{}],
          }}
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
              className="font-medium h-12 !text-base-color !placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md"
            >
              <Option value="event">Event</Option>
              <Option value="business">Business</Option>
              <Option value="job">Job</Option>
            </Select>
          </Form.Item>

          <Typography.Title level={5}>Priority Level</Typography.Title>
          <Form.Item
            name="priorityLevel"
            rules={[
              { required: true, message: "Please select a Priority Level!" },
            ]}
            style={{ fontWeight: "500" }}
          >
            <Select
              placeholder="Select Priority Level"
              className="font-medium h-12 !text-base-color !placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md"
            >
              {[1, 2, 3].map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Features Collapse */}
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={setActiveKey}
            className="bg-primary-color"
          >
            {feature.map((feat, index) => (
              <Panel
                header={`Feature ${index + 1}`}
                key={String(index)}
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
                <Form.Item
                  name={["features", index]}
                  initialValue={feat}
                  rules={[
                    { required: true, message: "Please input the feature!" },
                  ]}
                >
                  <Input
                    placeholder="Type your feature"
                    className="font-medium h-10 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
                  />
                </Form.Item>
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

          {/* Options Collapse */}
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
                        className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Typography.Title level={5}>
                      Expiration Days
                    </Typography.Title>
                    <Form.Item
                      name={["options", index, "expiration"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the Expiration days!",
                        },
                      ]}
                      style={{ fontWeight: "500" }}
                    >
                      <Input
                        placeholder="Enter Expiration Days"
                        className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Typography.Title level={5}>Time (Months)</Typography.Title>
                    <Form.Item
                      name={["options", index, "time"]}
                      rules={[
                        { required: true, message: "Please select a Time!" },
                      ]}
                      style={{ fontWeight: "500" }}
                    >
                      <Select
                        placeholder="Select Time"
                        className="font-medium h-12 !text-base-color !placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md"
                      >
                        {["1", "3", "6", "12"].map((time) => (
                          <Option key={time} value={`${time}`}>
                            {time} Month
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

          <Typography.Title level={5}>Add Description</Typography.Title>
          <Form.Item name="blueVerified" style={{ fontWeight: "500" }}>
            <Radio.Group>
              <Radio value={true}>Blue Checkmark</Radio>
              <Radio value={false}>No Checkmark</Radio>
            </Radio.Group>
          </Form.Item>

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
