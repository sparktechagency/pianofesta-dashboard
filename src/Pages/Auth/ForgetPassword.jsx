import { Button, Form, Input, Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";
import Container from "../../Components/UI/Container";
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/verify-otp");
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Forgot password?
              </h1>
              <p className="md:text-lg lg:text-xl mb-2 text-[#667085]">
                No worries, we’ll send you reset instructions.
              </p>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title
                level={4}
                className="text-start"
                style={{ color: "#222222" }}
              >
                Email
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
                name="email"
                className="text-base-color"
              >
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#667085] text-base-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl "
                  htmlType="submit"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>

            <div className="text-[#667085] w-fit mx-auto">
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
export default ForgotPassword;
