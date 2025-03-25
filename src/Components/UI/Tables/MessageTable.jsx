import MyTable from "../../../utils/MyTable";
const MessageTable = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
  // showFilters = true,
}) => {
  const columns = [
    {
      title: "#UID",
      render: (_, __, index) => index + 1,
      key: "_id",
    },
    {
      title: "Recipient",
      dataIndex: "recipient", // Data key for recipient
      key: "recipient",
    },
    {
      title: "Message",
      dataIndex: "message", // Data key for message
      key: "message",
    },
    {
      title: "Channel",
      dataIndex: "channel", // Data key for channel
      key: "channel",
    },
    {
      title: "Status",
      dataIndex: "status", // Data key for status
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date", // Data key for date
      key: "date",
    },
  ];

  return (
    <MyTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default MessageTable;
