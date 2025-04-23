import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
const AdminBusinessListingTable = ({
  data,
  loading,
  showViewModal,
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
      title: "Business Title",
      dataIndex: "businessTitle", // Data key for businessTitle
      key: "businessTitle",
    },
    {
      title: "Business Category",
      dataIndex: "category", // Data key for category
      key: "category",
    },
    {
      title: "Business User",
      dataIndex: "businessUser", // Data key for businessUser
      key: "businessUser",
    },
    {
      title: "Followers",
      dataIndex: "followers", // Data key for followers
      key: "followers",
      render: () => <span>11</span>,
    },
    {
      title: "Likes",
      dataIndex: "likes", // Data key for likes
      key: "likes",
      render: () => <span>11</span>,
    },
    {
      title: "Comments",
      dataIndex: "comments", // Data key for Comments
      key: "comments",
      render: () => <span>5</span>,
    },
    {
      title: "Ratings",
      dataIndex: "ratings", // Data key for ratings
      key: "ratings",
      render: () => <span>4</span>,
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
      keyValue={"uid"}
    />
  );
};

export default AdminBusinessListingTable;
