import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { MdDelete } from "react-icons/md";
const CategoryTable = ({
  data,
  loading,
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
      title: "Name",
      dataIndex: "name", // Data key for name
      key: "name",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
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
        </>
      ),
      responsive: ["md"],
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
