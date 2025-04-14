import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const SponseManagementTable = ({
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
    {
      title: "Package Name",
      dataIndex: "packageName", // Data key for packageName
      key: "packageName",
    },
    {
      title: "Features",
      dataIndex: "features", // Data key for packageName
      key: "features",
    },
    {
      title: "Pricing (1M/3M/6M/12M)",
      dataIndex: "pricing", // Data key for packageName
      key: "pricing",
    },
    {
      title: "Blue Checkmark",
      dataIndex: "blueCheckmark", // Data key for packageName
      key: "blueCheckmark",
    },
    {
      title: "Expiration (Days)",
      dataIndex: "expirationDays", // Data key for packageName
      key: "expirationDays",
    },
    {
      title: "Priority Level",
      dataIndex: "priorityLevel", // Data key for packageName
      key: "priorityLevel",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color"
                onClick={() => showEditModal(record)}
              >
                <FaEdit style={{ fontSize: "24px" }} />
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

export default SponseManagementTable;
