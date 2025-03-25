import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { MdDelete } from "react-icons/md";
const PromotionTable = ({
  data,
  loading,
  showDeleteModal,
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
      dataIndex: "code", // Data key for code
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount", // Data key for discount
      key: "discount",
    },
    {
      title: "Valid From",
      dataIndex: "validFrom", // Data key for validFrom
      key: "validFrom",
    },
    {
      title: "Valid To",
      dataIndex: "validTo", // Data key for validTo
      key: "validTo",
    },
    {
      title: "Applies to",
      dataIndex: "appliesTo", // Data key for appliesTo
      key: "appliesTo",
    },
    {
      title: "Usage Limit",
      dataIndex: "usageLimit", // Data key for usageLimit
      key: "usageLimit",
    },
    {
      title: "Uses",
      dataIndex: "uses", // Data key for uses
      key: "uses",
    },
    {
      title: "Status",
      dataIndex: "status", // Data key for status
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {record.status === "Active" ? (
              <Tooltip placement="left" title="Disable this Promotion">
                <button
                  className=" text-sm !p-1.5 rounded-md !bg-error-color !border-none !text-primary-color"
                  onClick={() => handleDisable(record)}
                >
                  Disable
                </button>
              </Tooltip>
            ) : (
              <Tooltip placement="left" title="Enable this Promotion">
                <button
                  className=" text-sm !p-1.5 rounded-md !bg-success-color !border-none !text-primary-color"
                  onClick={() => handleEnable(record)}
                >
                  Enable
                </button>
              </Tooltip>
            )}
            <Tooltip placement="left" title="Disable this Promotion">
              <button
                className="!p-0 !bg-transparent !border-none "
                onClick={() => showDeleteModal(record)}
              >
                <MdDelete className="text-2xl text-error-color" />
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
      keyValue={"code"}
    />
  );
};

export default PromotionTable;
