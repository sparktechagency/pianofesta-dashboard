import { Button, Collapse, ConfigProvider, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useUpdateFaqMutation } from "../../../../redux/features/faq/faqApi";
import { toast } from "sonner";
const UpdateFAQ = ({
  id,
  isFaqUpdateModalOpen,
  handleCancelFaqUpdateModal,
  currentRecord,
}) => {
  const [updateFaq] = useUpdateFaqMutation();
  const { Panel } = Collapse;

  const [activeKey, setActiveKey] = useState([0]); // Track the active panel
  const [form] = Form.useForm(); // Create form instance

  // Function to save all Q/A pairs
  const handleOnSave = async (values) => {
    console.log(values);
    const toastId = toast.loading("Updating FAQ...");
    try {
      const res = await updateFaq({
        id: id,
        data: {
          type: "update",
          index: currentRecord.index,
          faqItem: {
            question: values.question,
            answer: values.answer,
          },
        },
      });
      console.log(res);
      if (res?.data?.success) {
        toast.success("FAQ updated successfully", {
          id: toastId,
          duration: 2000,
        });
        form.resetFields();
        handleCancelFaqUpdateModal();
      }
    } catch (error) {
      toast.error("Failed to update FAQ", { id: toastId, duration: 2000 });
    }
  };

  // Function to add a new Q/A pair

  return (
    <Modal
      open={isFaqUpdateModalOpen}
      onCancel={() => handleCancelFaqUpdateModal()}
      footer={null}
      width={800}
    >
      <div className="p-2 rounded flex flex-col gap-5 w-full ">
        <div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold py-4 text-base-color">
            Update FAQ
          </h1>
        </div>
        {/* Q/A Portions */}
        <ConfigProvider
          theme={{
            components: {
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
          <Form form={form} onFinish={handleOnSave}>
            <Collapse
              accordion
              activeKey={activeKey}
              onChange={setActiveKey}
              className="bg-primary-color"
            >
              <Panel
                header={`Question`}
                className="!text-base-color bg-primary-color flex flex-col gap-1"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <p className="text-base-color text-xl font-medium">{`Question`}</p>
                    <Form.Item
                      name={"question"}
                      initialValue={currentRecord.question}
                      rules={[
                        {
                          required: true,
                          message: "Please input the question!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Type your question"
                        className="h-10 !bg-transparent border !border-base-color !text-base-color placeholder:text-gray-600"
                      />
                    </Form.Item>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-base-color text-xl font-medium">
                      Answer
                    </p>
                    <Form.Item
                      name={"answer"}
                      initialValue={currentRecord.answer}
                      rules={[
                        {
                          required: true,
                          message: "Please input the answer!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Type your answer"
                        className="h-10 !bg-transparent border !border-base-color !text-base-color placeholder:text-gray-600"
                      />
                    </Form.Item>
                  </div>
                </div>
              </Panel>
            </Collapse>
            <div>
              <Button
                block
                htmlType="submit"
                style={{
                  padding: "1px",
                  fontSize: "24px",
                  fontWeight: "500",

                  height: "40px",
                  border: "none",
                }}
                className="!mt-10 !bg-secondary-color !text-primary-color"
              >
                Save
              </Button>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </Modal>
  );
};

export default UpdateFAQ;
