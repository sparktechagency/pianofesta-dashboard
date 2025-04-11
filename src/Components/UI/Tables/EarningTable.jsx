import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
const EarningTable = ({
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
      title: "Name",
      dataIndex: "name", // Data key for name
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email", // Data key for email
      key: "email",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate", // Data key for purchaseDate
      key: "purchaseDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate", // Data key for endDate
      key: "endDate",
    },
    {
      title: "Remaining Day",
      dataIndex: "remainingDay", // Data key for remainingDay
      key: "remainingDay",
    },
    {
      title: "Plan",
      dataIndex: "plan", // Data key for plan
      key: "plan",
      filters: [
        { text: "Basic", value: "Basic" },
        { text: "Pro", value: "Pro" },
        { text: "Premium", value: "Premium" },
      ],
      onFilter: (value, record) => record.plan.includes(value),
    },
    {
      title: "Amount",
      dataIndex: "amount", // Data key for amount
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      onFilter: (value, record) => record.amount.includes(value),
    },
    {
      title: "Status",
      dataIndex: "status", // Data key for status
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status.includes(value),
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

export default EarningTable;
