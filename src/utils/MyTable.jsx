import { Table } from "antd";

const MyTable = ({
  className = "",
  loading,
  columns,
  data,
  setPage,
  total,
  limit,
  page,
  onChange,
  keyValue,
  scroll = { x: "max-content" },
  rowSelectionOn = false,
  selectedRowKeys = [],
  handleSelectChange = () => {},
}) => {
  return (
    <Table
      className={className}
      rowSelection={
        rowSelectionOn && {
          type: "checkbox",
          selectedRowKeys: selectedRowKeys,
          onChange: handleSelectChange,
        }
      }
      loading={loading}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={
        total > 0
          ? {
              current: page,
              onChange: (page) => setPage(page),
              showSizeChanger: false,
              total,
              pageSize: limit,
            }
          : false
      }
      scroll={scroll}
      rowKey={keyValue}
    />
  );
};

export default MyTable;
