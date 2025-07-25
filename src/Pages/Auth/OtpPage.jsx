import { Button, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import Container from "../../Components/UI/Container";
import { FaArrowLeftLong } from "react-icons/fa6";
import Cookies from "js-cookie";
import tryCatchWrapper from "../../utils/TryCatchWraper";
import { useForgetOtpVerifyMutation } from "../../redux/features/auth/authApi";

const OtpPage = () => {
  const [form] = Form.useForm();
  const email = Cookies.get("pianofesta_email");
  const [otp, setOtp] = useState("");
  const [otpMatch] = useForgetOtpVerifyMutation();

  const router = useNavigate();

  const handleOTPSubmit = async () => {
    const res = await tryCatchWrapper(
      otpMatch,
      { body: { otp: otp } },
      "Verifying..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.remove("pianofesta_email");
      Cookies.remove("pianofesta_forgetToken");
      Cookies.set(
        "pianofesta_forgetOtpMatchToken",
        res.data.forgetOtpMatchToken,
        {
          path: "/",
          expires: 1,
        }
      );

      router("/update-password");
    }
  };

  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Check your email
              </h1>
              <div className="text-[#667085]">
                <p className="lg:text-lg">We sent a verification link to</p>
                <p className="lg:text-lg mb-2 ">{email}</p>
              </div>
            </div>

            <Form
              form={form}
              layout="vertical"
              className="bg-transparent w-full"
            >
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-[#edfaff] border-dashed border-input-color
                      hover:border-input-color focus:bg-[#edfaff] focus:border-input-color rounded-lg mr-[10px] sm:mr-[20px] text-secondary-color"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full  py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  onClick={handleOTPSubmit}
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
            <div className="flex justify-center gap-2 py-1">
              <p>Didn’t receive code?</p>
              <Link
                href="/otp-verification"
                className="!text-secondary-color !underline font-semibold"
              >
                Click to resend
              </Link>
            </div>

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
export default OtpPage;
