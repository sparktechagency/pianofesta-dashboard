import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
import { Button } from "antd";
const AdminJobListingTable = ({
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
    setSelectedData(data.filter((job) => selectedRowKeys.includes(job._id)));
  }, [selectedRowKeys, data, setSelectedData]);

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      key: "_id",
      render: (_, __, index) => page * limit - limit + index + 1,
      fixed: "left",
    },
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <img
          src={logo || "/default-logo.png"}
          alt="Logo"
          className="w-auto h-14 object-contain"
        />
      ),
    },
    {
      title: "Cover",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (coverImage) => (
        <img
          src={coverImage || "/default-cover.png"}
          alt="Cover"
          className="w-auto h-14 object-cover"
        />
      ),
    },
    {
      title: "Gallery",
      dataIndex: "gallery",
      key: "gallery",
      render: (gallery) => (
        <div className="flex gap-1">
          {Array.isArray(gallery) && gallery.length > 0 ? (
            gallery
              .slice(0, 3)
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-10 h-10 object-cover rounded"
                />
              ))
          ) : (
            <span>No images</span>
          )}
        </div>
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
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Contract Type",
      dataIndex: "contractType",
      key: "contractType",
      render: (type) => {
        switch (type) {
          case "fullTime":
            return "Full Time";
          case "partTime":
            return "Part Time";
          case "freelance":
            return "Freelance";
          default:
            return type || "N/A";
        }
      },
    },
    {
      title: "Salary",
      dataIndex: "salery",
      key: "salery",
      render: (salary) => (salary ? `$${salary.toLocaleString()}` : "N/A"),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Work Hrs",
      dataIndex: "workHour",
      key: "workHour",
    },
    {
      title: "FAQ",
      dataIndex: "faq",
      key: "faq",
      render: (faq) => (Array.isArray(faq) ? faq.length : 0),
    },
    {
      title: "Ratings",
      dataIndex: "averageRating",
      key: "averageRating",
      render: (rating) => rating?.toFixed(1) || "0.0",
    },
    {
      title: "Comments",
      dataIndex: "totalComments",
      key: "totalComments",
    },
    {
      title: "Posted By",
      dataIndex: "author",
      key: "author",
      render: (author) => author?.name || "Unknown",
    },
    {
      title: "Resume",
      key: "resume",
      render: () => (
        <Button className="!bg-secondary-color !border-secondary-color !text-white">
          View
        </Button>
      ),
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

export default AdminJobListingTable;
