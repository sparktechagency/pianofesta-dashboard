import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { MdDelete, MdEdit } from "react-icons/md";
import { getImageUrl } from "../../../helpers/config/envConfig";
const CategoryTable = ({
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
  const serverUrl = getImageUrl();
  const columns = [
    {
      title: "#UID",
      render: (_, __, index) => index + 1,
      key: "_id",
    },
    {
      title: "Icon",
      dataIndex: "icon", // Data key for icon
      key: "icon",
      render: (icon) => (
        <img src={serverUrl + icon} alt="icon" className="w-8 h-8" />
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
