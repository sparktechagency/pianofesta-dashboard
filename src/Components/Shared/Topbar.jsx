/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import useUserData from "../../hooks/useUserData";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import SpinnerLoader from "../ui/SpinLoading";
import { useGetNotificationQuery } from "../../redux/features/dashboard/dashboardApi";
import { formatDateTime } from "../../utils/dateFormet";
import { FadeLoader } from "react-spinners";

const Topbar = ({ collapsed, setCollapsed }) => {
  const user = useUserData();
  const [open, setOpen] = useState(false);

  const { data: notification, isFetching: notificationFetching } =
    useGetNotificationQuery(
      { page: 1, limit: 6 },
      {
        skip: !user || !open,
        refetchOnMountOrArgChange: open,
      }
    );

  const { data, isFetching } = useGetProfileQuery(undefined, {
    skip: !user,
  });

  const profileData = data?.data;

  const profileImage = profileData?.profileImage;

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {notificationFetching ? (
        <div className="flex items-center justify-center h-[200px] !w-[200px]">
          <FadeLoader color="#6A0DAD" />
        </div>
      ) : (
        notification?.data?.slice(0, 6)?.map((notification) => (
          <div className="test-start " key={notification?._id}>
            <div className="flex items-center gap-2">
              <BellFilled className="text-secondary-color" />
              <div className="flex flex-col items-start">
                <p className="text-base-color font-semibold">
                  {notification.message?.text}
                </p>
                <p className="text-gray-400">
                  {" "}
                  {formatDateTime(notification?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1"
      >
        See More
      </Link>
    </div>
  );

  return (
    <div className="py-2 px-5 w-[98%] mx-auto flex justify-between gap-0 items-center bg-secondary-color rounded-full mt-2">
      <div className="flex items-center gap-2 text-primary-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center  gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          onOpenChange={(open) => {
            setOpen(open);
          }}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <BellFilled
            shape="circle"
            size="small"
            className="bg-primary-color py-[18px] px-2 text-xl rounded-full shadow h-6 font-bold text-secondary-color border border-secondary-color"
          />
        </Dropdown>
        <div>
          {isFetching ? (
            <SpinnerLoader />
          ) : (
            <Link to="/admin/setting">
              <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1  border border-secondary-color ">
                <img
                  src={profileImage || AllImages.dummyProfile}
                  alt="profile_pic"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                  className="rounded-full"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-base-color font-semibold text-sm">
                    {profileData?.name}
                  </p>
                  <p className="text-base-color text-xs">Admin</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Topbar;
