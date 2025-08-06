import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { MdDelete, MdEdit } from "react-icons/md";
const InspirationTable = ({
  data,
  loading,
  showViewModal,
  showEditModal,
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
      key: "_id",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Image",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (coverImage) => (
        <img
          src={coverImage}
          className="w-16 h-20 object-cover rounded-md"
          alt="Cover"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <p>{title}</p>,
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => <p>{desc}</p>,
      width: 400,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <span>{category?.name || "N/A"}</span>,
    },
    {
      title: "Post By",
      dataIndex: "author",
      key: "author",
      render: (author) => author?.name || "Unknown",
    },
    {
      title: "Role",
      dataIndex: ["author", "role"],
      key: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="small">
            {/* View Details Tooltip */}
            {record?.author?.role === "admin" && (
              <Tooltip placement="right" title="Edit Blog">
                <button
                  className="!p-0 !bg-transparent !border-none !text-secondary-color"
                  onClick={() => showEditModal(record)}
                >
                  <MdEdit style={{ fontSize: "20px" }} />
                </button>
              </Tooltip>
            )}
            {record?.role === "admin" && (
              <Tooltip placement="right" title="Edit Blog">
                <button
                  className="!p-0 !bg-transparent !border-none !text-secondary-color"
                  onClick={() => showEditModal(record)}
                >
                  <MdEdit style={{ fontSize: "20px" }} />
                </button>
              </Tooltip>
            )}
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color"
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "20px" }} />
              </button>
            </Tooltip>

            <Space size="middle">
              <Tooltip placement="left" title="Delete Blog">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color"
                  onClick={() => showDeleteModal(record)}
                >
                  <MdDelete style={{ fontSize: "20px" }} />
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
