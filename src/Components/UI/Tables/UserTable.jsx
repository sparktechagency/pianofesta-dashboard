import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { useEffect, useState } from "react";
const AllUserTable = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
  setSelectedData = () => {},
  rowSelectionOn = false,

  // showFilters = true,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  // Use useEffect to update selectedData in the parent component when selectedRowKeys changes
  useEffect(() => {
    // Set the selected data to the parent
    setSelectedData(
      data.filter((user) => selectedRowKeys.includes(user.email))
    );
  }, [selectedRowKeys, data, setSelectedData]); // Ensure this is using the props

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
      title: "Gender",
      dataIndex: "gender", // Data key for memberType
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email", // Data key for email
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone", // Data key for phone
      key: "phone",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth", // Data key for dateOfBirth
      key: "dateOfBirth",
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

            {/* Block User Tooltip */}
            {record?.isBanned ? (
              <Tooltip placement="left" title="Unblock this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-base-color"
                  onClick={() => showUnblockModal(record)}
                >
                  <CgUnblock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            ) : (
              <Tooltip placement="left" title="Block this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color"
                  onClick={() => showBlockModal(record)}
                >
                  <MdBlock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            )}
          </Space>
        </>
      ),

      align: "center",
    },
  ];

  return (
    <MyTable
      selectedRowKeys={selectedRowKeys}
      handleSelectChange={handleSelectChange}
      rowSelectionOn={rowSelectionOn}
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

export default AllUserTable;
