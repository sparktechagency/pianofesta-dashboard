import { Avatar, Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";
const ReportTable = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
  // showFilters = true,
}) => {
  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_, __, index) => page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Title",
      dataIndex: ["postId", "title"],
      key: "postTitle",
      render: (_, record) =>
        record?.postId
          ? record?.postId?.title
          : record?.inspirationId?.title || "N/A",
    },
    {
      title: "Category",
      dataIndex: "type",
      key: "postCategory",
      render: (type) =>
        type === "PostCommunity"
          ? "Community Post"
          : type === "PostBusiness"
          ? "Business Post"
          : type || "N/A",
    },
    {
      title: "Reported By",
      dataIndex: ["userId", "name"],
      key: "reportedBy",
      render: (_, record) => {
        const user = record?.userId;
        return (
          <div className="flex items-center gap-2">
            <Avatar src={user?.profileImage} />
            <span>{user?.name || "Unknown"}</span>
          </div>
        );
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (reason) => (
        <p className="max-w-xs text-gray-700 truncate overflow-hidden whitespace-nowrap">
          {reason}
        </p>
      ),
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
          <Tooltip placement="left" title="Delete Report">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
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

export default ReportTable;
