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
  Checkbox,
} from "antd";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";
import { useUpdateSponsorManagementMutation } from "../../../../redux/features/sponsorManagement/sponsorManagementApi";
import { toast } from "sonner";

const UpdateSponsorManagementModal = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [updateSponsor] = useUpdateSponsorManagementMutation();
  const { Option } = Select;
  const { Panel } = Collapse;

  const [feature, setFeature] = useState([""]);
  const [options, setOptions] = useState([0]);
  const [activeKey, setActiveKey] = useState(["0"]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditModalVisible && currentRecord) {
      const featuresFromRecord = currentRecord.feature?.length
        ? currentRecord.feature
        : [""];

      const optionsFromRecord = currentRecord.options?.length
        ? currentRecord.options
        : [{}];

      setFeature(featuresFromRecord);
      setOptions(optionsFromRecord.map((_, i) => i));
      setActiveKey(["0"]);

      form.setFieldsValue({
        name: currentRecord.title || "",
        subTitle: currentRecord.subTitle || "",
        type: currentRecord.type || "business",
        features: featuresFromRecord,
        options: optionsFromRecord.map((opt) => ({
          price: opt.price || "",
          expiration: opt.expirationDays || "",
          time: opt.time ? opt.time.replace(" Month", "") : "",
        })),
        priorityLevel: Number(currentRecord.priorityLevel) || 1, // Convert to number
        blueVerified: currentRecord.blueVerified || false,
      });
    }
  }, [isEditModalVisible, currentRecord, form]);

  const handleAdd = () => {
    form
      .validateFields()
      .then(() => {
        const newFeature = [...feature, ""];
        setFeature(newFeature);
        setActiveKey([String(newFeature.length - 1)]);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

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

  const handleAddOption = () => {
    setOptions((prev) => [...prev, prev.length]);
  };

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

  const handleSave = async (values) => {
    if (!values.options || values.options.length === 0) {
      toast.error("Please add at least one Option before saving.");
      return;
    }

    const payload = {
      title: values.name,
      subTitle: values.subTitle,
      type: values.type,
      feature: values.features,
      options: (values.options || []).map((opt) => ({
        price: Number(opt.price),
        expirationDays: Number(opt.expiration),
        time: `${opt.time} Month`,
      })),
      priorityLevel: Number(values.priorityLevel),
      blueVerified: values.blueVerified,
      _id: currentRecord?._id,
    };

    const res = await tryCatchWrapper(
      updateSponsor,
      { params: currentRecord._id, body: payload },
      "Updating Sponsor..."
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
      <Modal
        open={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-7"
          // preserve={false}
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
            name="type"
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

          <Typography.Title level={5}>Features</Typography.Title>
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={(key) => setActiveKey(Array.isArray(key) ? key : [key])}
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
                      type="button"
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
            type="button"
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
                forceRender // 👈 ensures the form fields render and register even if collapsed
                extra={
                  options.length > 1 && (
                    <button
                      type="button"
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
                        type="number"
                        min={0}
                      />
                    </Form.Item>
                  </div>

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
                        type="number"
                        min={0}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                        className="font-medium h-12 !text-base-color placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md"
                      >
                        {["1", "3", "6", "12"].map((time) => (
                          <Option key={time} value={time}>
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
            type="button"
          >
            <PlusOutlined />
            Add More Option
          </Button>

          <Typography.Title level={5}>Priority Level</Typography.Title>
          <Form.Item
            name="priorityLevel"
            rules={[
              { required: true, message: "Please select Priority Level!" },
            ]}
          >
            <Select
              className="font-medium h-12 rounded-md"
              placeholder="Select Priority Level"
            >
              {[1, 2, 3].map((lvl) => (
                <Option key={lvl} value={lvl}>
                  {lvl}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="blueVerified" valuePropName="checked">
            <Checkbox>Blue Verified Badge</Checkbox>
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

export default UpdateSponsorManagementModal;
