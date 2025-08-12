import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { formetDateAndTime } from "../../../utils/dateFormet";
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
      dataIndex: "_id",
      key: "_id",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Search Query",
      dataIndex: "keyword",
      key: "keyword",
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (user) => user?.name || "N/A",
    },
    {
      title: "Date",
      dataIndex: "searchDate",
      key: "searchDate",
      render: (date) => formetDateAndTime(date),
    },
    {
      title: "Results Count",
      dataIndex: "totalResults",
      key: "totalResults",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title="Send Notification">
            <button
              className="text-sm !py-2 !px-3 !bg-secondary-color !border-none !text-primary-color rounded-2xl"
              onClick={() => showViewModal(record)}
            >
              Send Notification
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

export default SearchHistoryTable;
