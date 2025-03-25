import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import MyTable from "../../../../utils/MyTable";
const AdminListingEventTable = ({
  data,
  loading,
  showViewModal,
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
      title: "Event Name",
      dataIndex: "eventName", // Data key for eventName
      key: "eventName",
    },
    {
      title: "Event Category",
      dataIndex: "eventCategory", // Data key for eventCategory
      key: "eventCategory",
    },
    {
      title: "Location",
      dataIndex: "location", // Data key for location
      key: "location",
    },
    {
      title: "Organizer",
      dataIndex: "organizer", // Data key for organizer
      key: "organizer",
    },
    {
      title: "Event Type",
      dataIndex: "eventType", // Data key for eventType
      key: "eventType",
    },
    {
      title: "Amount",
      dataIndex: "amount", // Data key for amount
      key: "amount",
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

            <Tooltip placement="left" title="Block this User">
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

export default AdminListingEventTable;
