import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
const SearchHistoryTable = ({
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
      title: "Search Query",
      dataIndex: "searchQuery", // Data key for searchQuery
      key: "searchQuery",
    },
    {
      title: "User",
      dataIndex: "user", // Data key for user
      key: "user",
    },
    {
      title: "Location",
      dataIndex: "location", // Data key for location
      key: "location",
    },
    {
      title: " Results Count",
      dataIndex: "resultsCount", // Data key for resultsCount
      key: "resultsCount",
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
                className="text-sm !py-2 !px-3 !bg-secondary-color !border-none !text-primary-color rounded-2xl"
                onClick={() => showViewModal(record)}
              >
                Send Notification
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

export default SearchHistoryTable;
