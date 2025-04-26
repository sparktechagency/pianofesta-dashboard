import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
import { AllImages } from "../../../../../public/images/AllImages";
import { createStyles } from "antd-style";

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

  // Use useEffect to update selectedData in the parent component when selectedRowKeys changes
  useEffect(() => {
    setSelectedData(data.filter((user) => selectedRowKeys.includes(user.uid)));
  }, [selectedRowKeys, data, setSelectedData]); // Make sure this is using the props
  const columns = [
    {
      title: "#UID",
      dataIndex: "uid",
      key: "uid",
      fixed: "left",
    },
    {
      title: "Event Name",
      dataIndex: "eventName", // Data key for eventName
      key: "eventName",
      fixed: "left",
    },
    {
      title: "Short Description",
      dataIndex: "shortDescription", // Data key for eventName
      key: "shortDescription",
      render: () => <p>This is a short description</p>,
    },
    {
      title: "Detail Description",
      dataIndex: "detailDescription", // Data key for eventName
      key: "detailDescription",
      render: () => <p>This is a detail description</p>,
    },
    {
      title: "Created Date",
      dataIndex: "CreatedDate", // Data key for CreatedDate
      key: "CreatedDate",
      render: () => <p>2023-06-01</p>,
    },
    {
      title: "Logo",
      dataIndex: "logo", // Data key for eventName
      key: "logo",
      render: () => (
        <img src={AllImages.company} className="w-auto h-14" alt="Logo" />
      ),
    },
    {
      title: "Cover",
      dataIndex: "cover", // Data key for eventName
      key: "cover",
      render: () => (
        <img src={AllImages.coverPhoto} className="w-auto h-14" alt="Logo" />
      ),
    },
    {
      title: "Gallery",
      dataIndex: "gallery", // Data key for eventName
      key: "gallery",
      render: () => (
        <img src={AllImages.coverPhoto} className="w-auto h-14" alt="Logo" />
      ),
    },
    {
      title: "Email",
      dataIndex: "email", // Data key for email
      key: "email",
      render: () => <p>abc@gmail.com</p>,
    },
    {
      title: "Phone",
      dataIndex: "phone", // Data key for phone
      key: "phone",
      render: () => <p>1234567890</p>,
    },
    {
      title: "Address",
      dataIndex: "address", // Data key for addre
      key: "address",
      render: () => <p>123 Main St, City</p>,
    },
    {
      title: "Geo-Location",
      dataIndex: "geoLocation", // Data key for geoLocation
      key: "geoLocation",
      render: () => <p>27.123456, 78.123456</p>,
    },
    {
      title: "Booking Link",
      dataIndex: "bookingLink", // Data key for bookingLink
      key: "bookingLink",
      render: () => <p>https://example.com/booking</p>,
    },
    {
      title: "Event Category",
      dataIndex: "eventCategory", // Data key for eventCategory
      key: "eventCategory",
      render: () => <p>Music</p>,
    },
    {
      title: "Event Type",
      dataIndex: "eventType", // Data key for eventType
      key: "eventType",
      render: () => <p>Online</p>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate", // Data key for startDate
      key: "startDate",
      render: () => <p>2023-06-01</p>,
    },
    {
      title: "End Date",
      dataIndex: "endDate", // Data key for endDate
      key: "endDate",
      render: () => <p>2023-06-30</p>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime", // Data key for startTime
      key: "startTime",
      render: () => <p>2023-06-01</p>,
    },
    {
      title: "End Time",
      dataIndex: "endTime", // Data key for endTime
      key: "endTime",
      render: () => <p>2023-06-30</p>,
    },
    {
      title: "Max Participants",
      dataIndex: "maxParticipants", // Data key for maxParticipants
      key: "maxParticipants",
      render: () => <p>2</p>,
    },
    {
      title: "Entrance Fee",
      dataIndex: "entranceFee", // Data key for entranceFee
      key: "entranceFee",
      render: () => <p>$200</p>,
    },
    {
      title: "Promotion Img",
      dataIndex: "promotionImg", // Data key for eventName
      key: "promotionImg",
      render: () => (
        <img src={AllImages.coverPhoto} className="w-auto h-14" alt="Logo" />
      ),
    },
    {
      title: "Supported Events",
      dataIndex: "supportedEvents", // Data key for location
      key: "supportedEvents",
    },
    {
      title: "Notes",
      dataIndex: "notes", // Data key for location
      key: "notes",
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
      title: "Likes",
      dataIndex: "likes", // Data key for likes
      key: "likes",
      render: () => <span>11</span>,
    },
    {
      title: "Comments",
      dataIndex: "comments", // Data key for Comments
      key: "comments",
      render: () => <span>5</span>,
    },
    {
      title: "Ratings",
      dataIndex: "ratings", // Data key for ratings
      key: "ratings",
      render: () => <span>4</span>,
    },
    {
      title: "FAQ",
      dataIndex: "faq",
      key: "faq",
      render: () => <span>4</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount", // Data key for amount
      key: "amount",
    },
    {
      title: "Organized By",
      dataIndex: "organizedBy", // Data key for amount
      key: "organizedBy",
      render: () => <span>Jhon Doe</span>,
    },
  ];

  return (
    <MyTable
      className={styles.customTable}
      selectedRowKeys={selectedRowKeys} // Correctly passing selectedRowKeys to MyTable
      handleSelectChange={handleSelectChange} // Correctly passing the handleSelectChange function
      rowSelectionOn={true} // Enabling row selection
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"uid"}
      scroll={{ x: "max-content" }}
    />
  );
};

export default AdminListingEventTable;
