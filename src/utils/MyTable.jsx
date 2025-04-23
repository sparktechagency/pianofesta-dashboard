import { Table } from "antd";

const MyTable = ({
  loading,
  columns,
  data,
  setPage,
  total,
  limit,
  page,
  onChange,
  keyValue,
  rowSelectionOn = false,
  selectedRowKeys = [],
  handleSelectChange = () => {},
}) => {
  return (
    <Table
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
      scroll={{ x: true }}
      rowKey={keyValue}
    />
  );
};

export default MyTable;
