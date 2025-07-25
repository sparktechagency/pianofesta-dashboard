import { Button, Form, Input, Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";
import Container from "../../Components/UI/Container";
import { FaArrowLeftLong } from "react-icons/fa6";
import tryCatchWrapper from "../../utils/TryCatchWraper";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";

const UpdatePassword = () => {
  const router = useNavigate();
  const [form] = Form.useForm();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values) => {
    const data = {
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };

    const res = await tryCatchWrapper(
      resetPassword,
      { body: data },
      "Changing Password..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.remove("pianofesta_forgetOtpMatchToken");
      router("/signin");
    }
  };

  return (
    <div>
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            {/* -------- update Password Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-3xl sm:text-4xl font-medium mb-4">
                  Set new password
                </h1>
                <p className="text-lg sm:text-xl mb-2 ">
                  Your new password must be different to previously used
                  passwords.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <Form
              form={form}
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title
                level={4}
                className="text-start"
                style={{ color: "#222222" }}
              >
                Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "New Password is Required",
                  },
                ]}
                name="password"
                className="text-base-color"
              >
                <Input.Password
                  placeholder="Enter new password"
                  className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
              <Typography.Title
                level={4}
                className="text-start"
                style={{ color: "#222222" }}
              >
                Confirm Password
              </Typography.Title>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                className="text-base-color"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Reset password
                </Button>
              </Form.Item>
            </Form>

            <div className="text-[#667085] w-fit mx-auto mt-10">
              <Link
                to={"/signin"}
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 mt-1" />
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
