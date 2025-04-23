import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
const AddAdminTable = ({
  data,
  loading,
  showViewModal,
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
      title: "Email",
      dataIndex: "email", // Data key for email
      key: "email",
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

export default AddAdminTable;
