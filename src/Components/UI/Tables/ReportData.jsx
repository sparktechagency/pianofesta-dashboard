import { Rate, Space, Tooltip } from "antd";
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
      render: (_, __, index) => index + 1,
      key: "_id",
    },
    {
      title: "Post Title",
      dataIndex: "postTitle", // Data key for postTitle
      key: "postTitle",
    },
    {
      title: "Post Category",
      dataIndex: "postCategory", // Data key for postCategory
      key: "postCategory",
    },
    {
      title: "Reported By",
      dataIndex: "reportedBy", // Data key for reportedBy
      key: "reportedBy",
    },
    {
      title: "Rating",
      dataIndex: "rating", // Data key for rating
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Date",
      dataIndex: "date", // Data key for date
      key: "date",
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
