import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
import { createStyles } from "antd-style";
import dayjs from "dayjs";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const AdminListingEventTable = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
  setSelectedData = () => {},
}) => {
  const { styles } = useStyle();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  useEffect(() => {
    setSelectedData(data.filter((item) => selectedRowKeys.includes(item._id)));
  }, [selectedRowKeys, data, setSelectedData]);

  const columns = [
    {
      title: "#ID",
      dataIndex: "_id",
      key: "_id",
      render: (_, __, index) => page * limit - limit + index + 1,
      fixed: "left",
    },
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Short Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Detail Description",
      dataIndex: "detailDescription",
      key: "detailDescription",
      width: 300,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => <img src={logo} className="w-auto h-14" alt="Logo" />,
    },
    {
      title: "Cover",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (cover) =>
        cover ? <img src={cover} className="w-auto h-14" alt="Cover" /> : "N/A",
    },
    {
      title: "Gallery",
      dataIndex: "gallery",
      key: "gallery",
      render: (gallery) =>
        gallery?.[0] ? (
          <img src={gallery[0]} className="w-auto h-14" alt="Gallery" />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Booking Link",
      dataIndex: "bookingAndPaymentLink",
      key: "bookingAndPaymentLink",
      render: (link) =>
        link ? (
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Max Participants",
      dataIndex: "maxParticipants",
      key: "maxParticipants",
    },
    {
      title: "Entrance Fee",
      dataIndex: "entranceFee",
      key: "entranceFee",
      render: (fee) => `$${fee}`,
    },
    {
      title: "Supported Services",
      dataIndex: "supportedServices",
      key: "supportedServices",
      render: (services) => services?.join(", ") ?? "N/A",
    },
    {
      title: "Additional Services",
      dataIndex: "additionalServices",
      key: "additionalServices",
      render: (services) => services?.join(", ") ?? "N/A",
    },
    {
      title: "Notes",
      dataIndex: "additionalNotes",
      key: "additionalNotes",
    },
    {
      title: "Likes",
      dataIndex: "totalLikes",
      key: "totalLikes",
    },
    {
      title: "Comments",
      dataIndex: "totalComments",
      key: "totalComments",
    },
    {
      title: "Ratings",
      dataIndex: "averageRating",
      key: "averageRating",
    },
    {
      title: "Reviews",
      dataIndex: "totalReviews",
      key: "totalReviews",
    },
  ];

  return (
    <MyTable
      className={styles.customTable}
      selectedRowKeys={selectedRowKeys}
      handleSelectChange={handleSelectChange}
      rowSelectionOn={true}
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"_id"}
      scroll={{ x: "max-content" }}
    />
  );
};

export default AdminListingEventTable;
