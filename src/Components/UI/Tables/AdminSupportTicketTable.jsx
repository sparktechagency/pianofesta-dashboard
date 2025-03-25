import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
const AdminSupportTicketTable = ({
  data,
  loading,
  showViewModal,
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
      title: "Ticket ID",
      dataIndex: "ticketId", // Data key for ticketId
      key: "ticketId",
    },
    {
      title: "User",
      dataIndex: "user", // Data key for user
      key: "user",
    },
    {
      title: "Subject",
      dataIndex: "subject", // Data key for subject
      key: "subject",
    },
    {
      title: "Status",
      dataIndex: "status", // Data key for status
      key: "status",
      render: (status) => {
        let color;
        if (status === "Pending") color = "#FACC15";
        if (status === "Solved") color = "green";
        return <span style={{ color: color }}>{status}</span>;
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate", // Data key for createdDate
      key: "createdDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color"
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          </Space>
        </>
      ),

      align: "center",
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

export default AdminSupportTicketTable;
