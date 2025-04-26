import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
import { AllImages } from "../../../../../public/images/AllImages";
const AdminBusinessListingTable = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
  setSelectedData = () => {},
}) => {
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
    },
    {
      title: "Business Title",
      dataIndex: "businessTitle", // Data key for businessTitle
      key: "businessTitle",
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
      title: "Created Date",
      dataIndex: "CreatedDate", // Data key for CreatedDate
      key: "CreatedDate",
      render: () => <p>2023-06-01</p>,
    },
    {
      title: "Website",
      dataIndex: "website", // Data key for website
      key: "website",
      render: () => <p>https://example.com</p>,
    },
    {
      title: "Facebook",
      dataIndex: "Facebook", // Data key for Facebook
      key: "Facebook",
      render: () => <p>https://example.com</p>,
    },
    {
      title: "Instagram",
      dataIndex: "Instagram", // Data key for Instagram
      key: "Instagram",
      render: () => <p>https://example.com</p>,
    },
    {
      title: "Start-End",
      dataIndex: "Start-End", // Data key for Start-End
      key: "Start-End",
      render: () => <p>10:00 AM - 5:00PM</p>,
    },
    {
      title: "Days",
      dataIndex: "Days", // Data key for Days
      key: "Days",
      render: () => <p>Sun - Fri</p>,
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
      title: "Provider Type",
      dataIndex: "provider-type", // Data key for provider-type
      key: "provider-type",
      render: () => <p>Venue</p>,
    },
    {
      title: "Event Type",
      dataIndex: "event-type", // Data key for event-type
      key: "event-type",
      render: () => <p>€560</p>,
    },
    {
      title: "Max Guests",
      dataIndex: "Max-Guests", // Data key for Max-Guests
      key: "Max-Guests",
      render: () => <p>560</p>,
    },
    {
      title: "FAQ ",
      dataIndex: "faq", // Data key for faq
      key: "faq",
      render: () => <p>-</p>,
    },
    {
      title: "Promotion-Image",
      dataIndex: "Promotion-Image", // Data key for eventName
      key: "Promotion-Image",
      render: () => (
        <img src={AllImages.company} className="w-auto h-14" alt="Logo" />
      ),
    },
    {
      title: "Price Range",
      dataIndex: "price-range", // Data key for price-range
      key: "price-range",
      render: () => <p>Venue</p>,
    },
    {
      title: "Business Category",
      dataIndex: "category", // Data key for category
      key: "category",
    },
    {
      title: "Business User",
      dataIndex: "businessUser", // Data key for businessUser
      key: "businessUser",
    },
    {
      title: "Followers",
      dataIndex: "followers", // Data key for followers
      key: "followers",
      render: () => <span>11</span>,
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
      title: "Listed-By",
      dataIndex: "Listed-By", // Data key for Listed-By
      key: "Listed-By",
      render: () => <span>Jhone</span>,
    },
  ];

  return (
    <MyTable
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
    />
  );
};

export default AdminBusinessListingTable;
