import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";
import { getImageUrl } from "../../../helpers/config/envConfig";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/profile/profileApi";
import tryCatchWrapper from "../../../utils/TryCatchWraper";
import Loading from "../../ui/Loading";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Email is required" }],
    disable: true,
  },
  {
    name: "name",
    type: "text",
    inputType: "text",
    label: "Full Name",
    placeholder: "Enter your Full Name",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Full Name is required" }],
    disable: false,
  },
  {
    name: "phone",
    type: "text",
    inputType: "tel",
    label: "Contact number",
    placeholder: "Enter your contact number",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Contact number is required" }],
    disable: false,
  },
];

const EditProfile = () => {
  const [form] = Form.useForm();
  const imageApiUrl = getImageUrl();
  const { data, isFetching } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation({});

  const profileData = data?.data?.userData;

  const profileImage = imageApiUrl + profileData?.profileImage;

  const [imageUrl, setImageUrl] = useState(profileImage);

  useEffect(() => {
    setImageUrl(profileImage);
  }, [profileImage]);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }
    const data = {
      fullName: values?.fullName,
      phone: values?.phone,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      "Updating Profile..."
    );
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="bg-primary-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  #0000000D" }}
    >
      <div className="bg-secondary-color w-full p-5  rounded-tl-xl rounded-tr-xl">
        <div className=" mx-auto  flex items-center ">
          <IoChevronBackOutline
            className="text-4xl cursor-pointer text-primary-color font-semibold mr-2"
            onClick={() => window.history.back()}
          />
          <p className="text-3xl text-primary-color font-semibold">
            Edit Profile
          </p>
        </div>
      </div>
      <div className=" flex p-10">
        <Form
          form={form}
          handleFinish={onFinish}
          className="py-10 w-full lg:w-[70%]"
          defaultValues={profileData}
        >
          <div className="mt-5 flex flex-col mb-10 gap-x-4">
            <div className=" relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                src={imageUrl}
                alt=""
              />
              <Form.Item name="image">
                <Upload
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className=" text-start"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  listType="picture"
                >
                  <button
                    type="button"
                    style={{
                      zIndex: 1,
                    }}
                    className="bg-secondary-color p-2 w-fit h-fit shadow !border-none absolute -top-12 left-[115px] rounded-full cursor-pointer"
                  >
                    <IoCameraOutline className="w-6 h-6 text-primary-color" />
                  </button>
                </Upload>
              </Form.Item>
            </div>
            <p className="text-5xl font-semibold -mt-5">
              {profileData?.fullName}
            </p>
          </div>

          {inputStructure.map((input, index) => (
            <Form.Item
              key={index}
              name={input.name}
              label={input.label}
              rules={input.rules}
            >
              <Input placeholder={input.placeholder} />
            </Form.Item>
          ))}

          <Button htmlType="submit" className="w-full mt-4">
            Submit
          </Button>

          <div className=" text-white mt-5"></div>
        </Form>
      </div>
    </div>
  );
};
export default EditProfile;
