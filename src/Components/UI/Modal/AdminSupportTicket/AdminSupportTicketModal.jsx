/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const AdminSupportTicketModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [replyPerson, setReplyPerson] = useState(null);
  const [form] = Form.useForm();

  const handleSave = async (values) => {
    console.log(values);
  };
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <div className="mt-7 flex flex-col lg:flex-row gap-3">
        <div className="order-first lg:order-last min-w-[250px]">
          <div
            className="p-3 rounded-lg mb-3"
            style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
          >
            <h3 className="text-2xl font-bold text-center ">
              Customer Details
            </h3>
            <div className="flex justify-between items-center">
              <div className="">
                <div className="flex flex-row lg:flex-col gap-1 items-center lg:items-start mt-3">
                  <img
                    src={AllImages.user}
                    className="w-auto h-24 rounded"
                    alt=""
                  />
                  <div>
                    <h4 className="text-lg text-secondary-color font-semibold">
                      {currentRecord?.user}
                    </h4>
                    <p className=" text-[#7B7B7B]">Regular User</p>
                    <p>
                      <span className="font-semibold">Email: </span>
                      <span className=" text-[#7B7B7B]">user@gmail.com</span>
                    </p>

                    <p>
                      <span className="font-semibold">Phone: </span>
                      <span className=" text-[#7B7B7B]">16131031341</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="!bg-success-color !border-success-color !text-white !text-sm mb-5">
              Mark as Complete
            </Button>
          </div>
        </div>
        <div>
          <div className="">
            <div
              className="flex justify-between items-center p-3 rounded-lg"
              style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
            >
              <h4 className="lg:text-lg font-bold">Payment Issue</h4>
              <span className="lg:text-lg px-3 py-1.5 bg-warning-color text-primary-color rounded-lg">
                Pending
              </span>
            </div>
          </div>
          <div
            className="p-3 mt-3 rounded-lg"
            style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
          >
            <div className="border-b pb-2">
              <div className="flex justify-between items-center rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={AllImages.user}
                    className="rounded-full h-12 w-12"
                    alt=""
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      I can’t pay through Card
                    </p>
                    <p className="text-sm text-[#7B7B7B]">
                      <span className="text-secondary-color">
                        {currentRecord?.user}{" "}
                      </span>
                      reported an issue
                    </p>
                  </div>
                </div>
                <p className="text-sm">A day Ago(Wed 08 2024 at 3:47 PM)</p>
              </div>
            </div>

            <p className="text-[#757575] mt-3 ">
              Lorem ipsum dolor sit amet consectetur. Turpis tempus viverra
              ultricies neque amet porta interdum. Ullamcorper nulla massa est
              enim tincidunt gravida senectus curabitur. Commodo aliquet mattis
              sit leo tellus. Sagittis ridiculus ligula dignissim sapien in
              elementum blandit pretium.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setReplyPerson(currentRecord?.user)}
            className="w-fit flex items-center gap-1 mt-2 !bg-primary-color border !border-secondary-color !text-secondary-color px-3 py-0.5 rounded-md"
            style={{ boxShadow: "0px 0px 2px 1px #00000040" }}
          >
            <IoArrowUndoSharp className="text-secondary-color" /> Reply
          </button>

          <div className="pt-3 mt-10 border-t">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              className=""
            >
              {replyPerson && (
                <div className="text-lg font-semibold mb-2 flex items-center gap-1">
                  Reply to{" "}
                  <p className="text-secondary-color group flex items-center gap-1">
                    <span className="underline">{replyPerson}</span>
                    <IoMdCloseCircleOutline
                      onClick={() => setReplyPerson(null)}
                      className="text-secondary-color opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
                    />
                  </p>
                </div>
              )}
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please input the message!" },
                ]}
                style={{ fontWeight: "500" }}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter message"
                  className="font-medium h-12  !text-base-color  placeholder:text-[#B5B5B5] border !border-secondary-color rounded-md text-xl !bg-input-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="w-fit h-10 !bg-gradient-to-b from-[#8F59F9] to-[#6A0DAD] border !border-secondary-color !text-white text-base font-bold rounded-md"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminSupportTicketModal;
