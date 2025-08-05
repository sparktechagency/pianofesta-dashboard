import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
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
    setSelectedData(data.filter((user) => selectedRowKeys.includes(user._id)));
  }, [selectedRowKeys, data, setSelectedData]); // Make sure this is using the props

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      key: "_id",
      render: (_, __, index) => page * limit - limit + index + 1,
      fixed: "left",
    },
    {
      title: "Business Title",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Short Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p>{text || "-"}</p>,
      width: 300,
    },
    {
      title: "Detail Description",
      dataIndex: "detailDescription",
      key: "detailDescription",
      render: (text) => <p>{text || "-"}</p>,
      width: 300,
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (url) =>
        url ? (
          <img src={url} alt="Logo" className="w-auto h-14 rounded" />
        ) : (
          <span>No Logo</span>
        ),
    },
    {
      title: "Cover",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (url) =>
        url ? (
          <img src={url} alt="Cover" className="w-auto h-14 rounded" />
        ) : (
          <span>No Cover</span>
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
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (url) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {url}
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Facebook",
      dataIndex: ["socialLinks", "facebook"],
      key: "facebook",
      render: (url) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Facebook
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Instagram",
      dataIndex: ["socialLinks", "instagram"],
      key: "instagram",
      render: (url) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Instagram
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Start-End",
      key: "startEnd",
      render: (_, record) =>
        record.availabilities
          ? `${record.availabilities.startTime} - ${record.availabilities.endTime}`
          : "-",
    },
    {
      title: "Days",
      key: "days",
      render: (_, record) =>
        record.availabilities ? record.availabilities.day.join(", ") : "-",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Geo-Location",
      key: "geoLocation",
      render: (_, record) =>
        record.location
          ? `${record.location.coordinates[1]}, ${record.location.coordinates[0]}`
          : "-",
    },
    {
      title: "Provider Type",
      dataIndex: ["providerType", "name"],
      key: "providerType",
    },
    {
      title: "Max Guests",
      dataIndex: "maxGuest",
      key: "maxGuest",
    },
    {
      title: "FAQ",
      dataIndex: "faq",
      key: "faq",
      render: (faqs) =>
        faqs && faqs.length > 0
          ? faqs.map((faq, idx) => (
              <p key={faq._id || idx}>
                <strong>Q:</strong> {faq.question} <br />
                <strong>A:</strong> {faq.answer}
              </p>
            ))
          : "-",
    },
    {
      title: "Price Range",
      dataIndex: "priceRange",
      key: "priceRange",
      render: (text) =>
        text ? text.charAt(0).toUpperCase() + text.slice(1) : "-",
    },
    {
      title: "Business Level",
      dataIndex: "businessLevel",
      key: "businessLevel",
    },
    {
      title: "Followers",
      dataIndex: "totalLikes",
      key: "totalLikes",
    },
    {
      title: "Likes",
      dataIndex: "totalLikes",
      key: "likes",
    },
    {
      title: "Comments",
      dataIndex: "totalComments",
      key: "comments",
    },
    {
      title: "Average Rating",
      dataIndex: "averageRating",
      key: "averageRating",
    },
    {
      title: "Listed By",
      dataIndex: ["author", "name"],
      key: "listedBy",
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
      keyValue={"_id"}
    />
  );
};

export default AdminBusinessListingTable;
