import { formatDateTime } from "../../../utils/dateFormet";
import MyTable from "../../../utils/MyTable";

const NotificationTable = ({ data, loading, setPage, page, total, limit }) => {
  // Map API data to table-friendly structure
  const tableData = data?.map((item, index) => ({
    key: item?._id,
    uid: index + 1,
    recipient: item?.receiverId?.name, // or replace with actual recipient name if available
    message: item?.message?.text || "",
    channel: item?.channel || "",
    status: item?.status || "",
    date: formatDateTime(item?.createdAt),
  }));

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      key: "_id",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Recipient",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "Notification",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <MyTable
      columns={columns}
      data={tableData}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"key"}
    />
  );
};

export default NotificationTable;
