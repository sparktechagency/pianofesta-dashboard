import { Space, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
const AdminJobListingTable = ({
  data,
  loading,
  showDeleteModal,
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
    setSelectedData(data.filter((user) => selectedRowKeys.includes(user.uid)));
  }, [selectedRowKeys, data, setSelectedData]); // Make sure this is using the props

  const columns = [
    {
      title: "#UID",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle", // Data key for jobTitle
      key: "jobTitle",
    },
    {
      title: "Job Role",
      dataIndex: "jobRole", // Data key for jobRole
      key: "jobRole",
    },
    {
      title: "Contract Type",
      dataIndex: "contractType", // Data key for contractType
      key: "contractType",
    },
    {
      title: "Salary",
      dataIndex: "salary", // Data key for salary
      key: "salary",
    },
    {
      title: "Experience",
      dataIndex: "experience", // Data key for experience
      key: "experience",
    },
    {
      title: "Organizer",
      dataIndex: "organizer", // Data key for organizer
      key: "organizer",
    },
    {
      title: "Work Hrs",
      dataIndex: "workHrs", // Data key for workHrs
      key: "workHrs",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}

            <Tooltip placement="left" title="Block this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color"
                onClick={() => showDeleteModal(record)}
              >
                <MdDelete style={{ fontSize: "24px" }} />
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
      keyValue={"email"}
    />
  );
};

export default AdminJobListingTable;
