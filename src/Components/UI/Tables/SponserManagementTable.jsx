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
      dataIndex: "_id",
      render: (_, __, index) => (page - 1) * limit + index + 1,
      key: "_id",
      fixed: "left",
    },
    {
      title: "Package Name",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Features",
      dataIndex: "feature",
      key: "feature",
      render: (features) => features?.join(", ") || "-",
    },
    {
      title: "Pricing (1M / 3M / 6M / 12M)",
      dataIndex: "options",
      key: "options",
      render: (options) => {
        if (!options || options.length === 0) return "-";

        return (
          <div className="flex flex-col gap-1">
            {options.map((opt, idx) => {
              const time =
                opt.time?.replace(" Month", " Month") || `${idx + 1}M`;
              const price = opt.price != null ? `$${opt.price}` : "-";
              return (
                <div key={idx}>
                  <strong>{time}:</strong> {price}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Expiration (Days)",
      dataIndex: "options",
      key: "expirationDays",
      render: (options) => {
        if (!options || options.length === 0) return "-";

        return (
          <div className="flex flex-col gap-1">
            {options.map((opt, idx) => {
              const time =
                opt.time?.replace(" Month", " Month") || `${idx + 1}M`;
              const expiration = opt.expirationDays ?? "-";
              return (
                <div key={idx}>
                  <strong>{time}:</strong> {expiration} days
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Blue Checkmark",
      dataIndex: "blueVerified",
      key: "blueVerified",
      render: (value) => (value ? "✅ Yes" : "❌ No"),
    },

    {
      title: "Priority Level",
      dataIndex: "priorityLevel",
      key: "priorityLevel",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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

export default SponseManagementTable;
