import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { useEffect, useState } from "react";

const AllBusinessUserTable = ({
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
      title: "Active Sponsorship",
      dataIndex: "activeSponsorship", // Data key for name
      key: "activeSponsorship",
    },
    {
      title: "Business Profile",
      dataIndex: "businessProfile", // Data key for name
      key: "businessProfile",
    },
    {
      title: "Event Created",
      dataIndex: "eventCreated", // Data key for eventCreated
      key: "eventCreated",
    },
    {
      title: "Credit",
      dataIndex: "credit", // Data key for memberType
      key: "credit",
    },
    {
      title: "Job Posted ",
      dataIndex: "jobPosted", // Data key for jobPosted
      key: "jobPosted",
    },
    {
      title: "Followers",
      dataIndex: "followers", // Data key for followers
      key: "followers",
    },
    {
      title: "Likes",
      dataIndex: "likes", // Data key for likes
      key: "likes",
    },
    {
      title: "Supported Events",
      dataIndex: "supportedEvents", // Data key for supportedEvents
      key: "supportedEvents",
    },
    {
      title: "Additional Services",
      dataIndex: "additionalServices", // Data key for additionalServices
      key: "additionalServices",
    },
    {
      title: "Reviews ",
      dataIndex: "reviews", // Data key for reviews
      key: "reviews",
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

export default AllBusinessUserTable;
