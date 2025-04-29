import MyTable from "../../../utils/MyTable";

const RequestCategoryTable = ({
  data,
  loading,
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
      title: "Category Name",
      dataIndex: "name", // Data key for name
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type", // Data key for name
      key: "type",
    },
    {
      title: "Requested By",
      dataIndex: "requestedBy", // Data key for name
      key: "requestedBy",
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

export default RequestCategoryTable;
