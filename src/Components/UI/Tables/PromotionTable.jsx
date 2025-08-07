import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { MdDelete, MdEdit } from "react-icons/md";
import { formatDate } from "../../../utils/dateFormet";
const PromotionTable = ({
  data,
  loading,
  showDeleteModal,
  showEditModal,
  handleEnable,
  handleDisable,
  setPage,
  page,
  total,
  limit,
  // showFilters = true,
}) => {
  const columns = [
    {
      title: "Code",
      dataIndex: "name", // this is your 'name' field
      key: "name",
    },
    {
      title: "Discount",
      dataIndex: "discountPrice", // correct field
      key: "discountPrice",
      render: (text) => `${text}%`, // optional: add % sign
    },
    {
      title: "Valid From",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => formatDate(text), // format ISO to readable
    },
    {
      title: "Valid To",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => formatDate(text),
    },
    {
      title: "Applies to",
      dataIndex: "appliesTo",
      key: "appliesTo",
      render: (text) => {
        switch (text) {
          case "all":
            return "All Packs";
          case "business":
            return "Business Pack";
          case "event":
            return "Event Pack";
          case "job":
            return "Job Pack";
          default:
            return text;
        }
      },
    },
    {
      title: "Usage Limit",
      dataIndex: "usageLimit",
      key: "usageLimit",
    },
    {
      title: "Uses",
      dataIndex: "usedCount", // actual field from your data
      key: "usedCount",
    },
    {
      title: "Status",
      dataIndex: "isEnable",
      key: "status",
      render: (isEnable) => (
        <span
          className={`${isEnable ? "text-success-color" : "text-error-color"}`}
        >
          {isEnable ? "Active" : "Disabled"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.isEnable ? (
            <Tooltip placement="left" title="Disable this Promotion">
              <button
                className="text-sm !p-1.5 rounded-md !bg-error-color !border-none !text-primary-color"
                onClick={() => handleDisable(record)}
              >
                Disable
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Enable this Promotion">
              <button
                className="text-sm !p-1.5 rounded-md !bg-success-color !border-none !text-primary-color"
                onClick={() => handleEnable(record)}
              >
                Enable
              </button>
            </Tooltip>
          )}
          <Tooltip placement="right" title="Edit this Promotion">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color"
              onClick={() => showEditModal(record)}
            >
              <MdEdit style={{ fontSize: "20px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="left" title="Delete this Promotion">
            <button
              className="!p-0 !bg-transparent !border-none"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete className="text-2xl text-error-color" />
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
      keyValue={"code"}
    />
  );
};

export default PromotionTable;
