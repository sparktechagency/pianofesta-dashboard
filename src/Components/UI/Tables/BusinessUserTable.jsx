import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { useEffect, useState } from "react";
import { formetDateAndTime } from "../../../utils/dateFormet";

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
    setSelectedData(
      data?.filter((user) => selectedRowKeys.includes(user.customId))
    );
  }, [selectedRowKeys, data, setSelectedData]); // Make sure this is using the props

  const columns = [
    {
      title: "#UID",
      key: "index",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "User ID",
      dataIndex: "customId",
      key: "customId",
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => `${record.name} ${record.sureName}`,
    },
    {
      title: "Active Sponsorship",
      dataIndex: "activeSponsorship",
      key: "activeSponsorship",
    },
    {
      title: "Business Profile",
      dataIndex: "totalBusiness",
      key: "totalBusiness",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formetDateAndTime(createdAt),
    },
    {
      title: "Event Created",
      dataIndex: "totalEvent",
      key: "totalEvent",
    },
    {
      title: "Credit",
      dataIndex: "totalCredit",
      key: "totalCredit",
    },
    {
      title: "Job Posted",
      dataIndex: "totalJob",
      key: "totalJob",
    },
    {
      title: "Followers",
      dataIndex: "totalFollowers",
      key: "totalFollowers",
    },
    {
      title: "Likes",
      dataIndex: "totalLikes",
      key: "totalLikes",
    },
    {
      title: "Supported Events",
      dataIndex: "totalSupportedServices",
      key: "totalSupportedServices",
    },
    {
      title: "Additional Services",
      dataIndex: "totalAdditionalServices",
      key: "totalAdditionalServices",
    },
    {
      title: "Reviews",
      dataIndex: "totalReviews",
      key: "totalReviews",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {record?.isBlocked ? (
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
      keyValue={"customId"}
    />
  );
};

export default AllBusinessUserTable;
