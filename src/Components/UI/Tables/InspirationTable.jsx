import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";
const InspirationTable = ({
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
      title: "Description",
      dataIndex: "description", // Data key for name
      key: "description",
    },
    {
      title: "Post By",
      dataIndex: "postBy", // Data key for memberType
      key: "postBy",
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

            <Space size="middle">
              <Tooltip placement="left" title="Delete Category">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color"
                  onClick={() => showDeleteModal(record)}
                >
                  <MdDelete style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            </Space>
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
      keyValue={"_id"}
    />
  );
};

export default InspirationTable;
