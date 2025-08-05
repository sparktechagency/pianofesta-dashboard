import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { MdDelete, MdEdit } from "react-icons/md";
const CategoryTable = ({
  activeTab,
  data,
  loading,
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
    activeTab !== "inspiration"
      ? {
          title: "Icon",
          dataIndex: "icon",
          key: "icon",
          render: (icon) => <img src={icon} alt="icon" className="w-8 h-8" />,
        }
      : {
          title: "Image",
          dataIndex: "banner",
          key: "banner",
          render: (banner) => (
            <img src={banner} alt="image" className="w-12 h-12" />
          ),
        },
    {
      title: "Name",
      dataIndex: "name", // Data key for name
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description", // Data key for description
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="left" title="Edit Category">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color"
                onClick={() => showEditModal(record)}
              >
                <MdEdit style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
            <Tooltip placement="left" title="Delete Category">
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

export default CategoryTable;
