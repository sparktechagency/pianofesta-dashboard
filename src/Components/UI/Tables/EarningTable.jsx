import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { useEffect, useState } from "react";
const EarningTable = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
  setSelectedData = () => {},
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  // Use useEffect to update selectedData in the parent component when selectedRowKeys changes
  useEffect(() => {
    setSelectedData(data.filter((user) => selectedRowKeys.includes(user.UID)));
  }, [selectedRowKeys, data, setSelectedData]); // Make sure this is using the props
  const columns = [
    {
      title: "#UID",
      dataIndex: "UID",
      key: "UID",
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
    },
    {
      title: "Amount",
      dataIndex: "amount", // Data key for amount
      key: "amount",
      render: (amount) => <span>${amount}</span>,
    },
    {
      title: "Status",
      dataIndex: "status", // Data key for status
      key: "status",
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
      selectedRowKeys={selectedRowKeys} // Correctly passing selectedRowKeys to MyTable
      handleSelectChange={handleSelectChange} // Correctly passing the handleSelectChange function
      rowSelectionOn={true} // Enabling row selection
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"UID"}
    />
  );
};

export default EarningTable;
