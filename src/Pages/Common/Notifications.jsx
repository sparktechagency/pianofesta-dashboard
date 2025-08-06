import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { MdArrowBackIos } from "react-icons/md";
import useUserData from "../../hooks/useUserData";
import { useGetNotificationQuery } from "../../redux/features/dashboard/dashboardApi";
import { formatDateTime } from "../../utils/dateFormet";
import { Pagination } from "antd";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const limit = 15; // notifications per page
  const user = useUserData();

  // Fetch all notifications at once (no pagination params)
  const { data: notification, isFetching: notificationFetching } =
    useGetNotificationQuery(
      {},
      {
        skip: !user,
        refetchOnMountOrArgChange: true,
      }
    );

  // Defensive: notifications array (empty if no data)
  const allNotifications = notification?.data || [];

  // Calculate the slice for current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const currentNotifications = allNotifications.slice(startIndex, endIndex);

  return (
    <div
      className="bg-slate-50 rounded-xl min-h-[90vh] w-full"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer"
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color">Notification</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8">
        {notificationFetching && <p>Loading notifications...</p>}
        {!notificationFetching && allNotifications.length === 0 && (
          <p>No notifications found.</p>
        )}

        {currentNotifications.map((notification) => (
          <div
            key={notification._id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className="bg-[#b8c1c3] p-2 rounded-full">
              <FiBell className="text-secondary-color w-6 h-6" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col items-start">
              <p className="text-base-color font-semibold">
                {notification.message?.text}
              </p>
              <p className="text-gray-400">
                {formatDateTime(notification?.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="py-10 flex items-center justify-center">
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          pageSize={limit}
          total={allNotifications.length}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Notifications;
