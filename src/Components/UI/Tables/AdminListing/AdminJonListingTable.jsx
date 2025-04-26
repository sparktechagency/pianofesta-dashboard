import MyTable from "../../../../utils/MyTable";
import { useEffect, useState } from "react";
import { AllImages } from "../../../../../public/images/AllImages";
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
    setSelectedData(data.filter((user) => selectedRowKeys.includes(user.uid)));
  }, [selectedRowKeys, data, setSelectedData]); // Make sure this is using the props

  const columns = [
    {
      title: "#UID",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle", // Data key for jobTitle
      key: "jobTitle",
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
      title: "Created Date",
      dataIndex: "CreatedDate", // Data key for CreatedDate
      key: "CreatedDate",
      render: () => <p>2023-06-01</p>,
    },
    {
      title: "Address",
      dataIndex: "address", // Data key for addre
      key: "address",
      render: () => <p>123 Main St, City</p>,
    },
    {
      title: " Role",
      dataIndex: "Role", // Data key for Role
      key: "Role",
      render: () => <p>CEO</p>,
    },
    {
      title: "Contract Type",
      dataIndex: "contractType", // Data key for contractType
      key: "contractType",
    },
    {
      title: "Salary",
      dataIndex: "salary", // Data key for salary
      key: "salary",
    },
    {
      title: "Experience",
      dataIndex: "experience", // Data key for experience
      key: "experience",
    },

    {
      title: "Work Hrs",
      dataIndex: "workHrs", // Data key for workHrs
      key: "workHrs",
    },
    {
      title: "FAQ",
      dataIndex: "FAQ", // Data key for FAQ
      key: "FAQ",
      render: () => <span>5</span>,
    },
    {
      title: "Ratings",
      dataIndex: "ratings", // Data key for ratings
      key: "ratings",
      render: () => <span>4</span>,
    },
    {
      title: "Comments",
      dataIndex: "comments", // Data key for Comments
      key: "comments",
      render: () => <span>5</span>,
    },
    {
      title: "Posted By",
      dataIndex: "organizer", // Data key for organizer
      key: "organizer",
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
      keyValue={"email"}
    />
  );
};

export default AdminJobListingTable;
