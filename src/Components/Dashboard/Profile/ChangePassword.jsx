import { Button, Form, Input, Typography } from "antd";
import tryCatchWrapper from "../../../utils/TryCatchWraper";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import Cookies from "js-cookie";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [updatePassword] = useChangePasswordMutation();

  const onFinish = async (values) => {
    const data = {
      oldPassword: values.currentPassword,
      newPassword: values.reEnterPassword,
    };

    const res = await tryCatchWrapper(
      updatePassword,
      { body: data },
      "Changing Password..."
    );
    if (res.statusCode === 200) {
      Cookies.remove("pianofesta_accessToken");

      window.location.href = "/signin";
      window.location.reload();
    }
  };
  return (
    <div className="lg:w-[70%] my-20">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <Typography.Title level={4} style={{ color: "#222222" }}>
          Current password
        </Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your current password!",
            },
          ]}
          name="currentPassword"
          className="text-white "
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-secondary-color/10 !text-base-color !bg-input-color"
          />
        </Form.Item>
        <Typography.Title level={4} style={{ color: "#222222" }}>
          New password
        </Typography.Title>
        <Form.Item
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
          name="newPassword"
          className="text-white"
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-secondary-color/10 !text-base-color !bg-input-color"
          />
        </Form.Item>
        <Typography.Title level={4} style={{ color: "#222222" }}>
          Re-enter new Password
        </Typography.Title>
        <Form.Item
          name="reEnterPassword"
          className="text-white"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-secondary-color/10 !text-base-color !bg-input-color"
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
            htmlType="submit"
          >
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
