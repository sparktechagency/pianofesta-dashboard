import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { MdDelete, MdEdit } from "react-icons/md";
import { AllImages } from "../../../../public/images/AllImages";
const InspirationGalleryTable = ({
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
      render: (_, __, index) => index + 1,
      key: "_id",
    },
    {
      title: " Image",
      dataIndex: "image", // Data key for image
      key: "image",
      render: () => (
        <img src={AllImages.coverPhoto} className="w-16 h-20" alt="Logo" />
      ),
    },
    {
      title: " Title",
      dataIndex: "postTitle", // Data key for postTitle
      key: "postTitle",
    },
    {
      title: " category",
      dataIndex: "category", // Data key for category
      key: "category",
      render: () => <p>Wedding </p>,
    },
    {
      title: "Post By",
      dataIndex: "postBy", // Data key for memberType
      key: "postBy",
    },
    {
      title: "Role",
      dataIndex: "role", // Data key for memberType
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="small">
            {/* View Details Tooltip */}
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

export default InspirationGalleryTable;
