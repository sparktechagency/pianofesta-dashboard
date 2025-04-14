import { Space, Tooltip } from "antd";
import MyTable from "../../../utils/MyTable";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
const AllBusinessUserTable = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
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
      title: "Name",
      dataIndex: "name", // Data key for name
      key: "name",
    },
    {
      title: "Active Sponsorship",
      dataIndex: "activeSponsorship", // Data key for name
      key: "activeSponsorship",
      sorter: (a, b) => a.activeSponsorship - b.activeSponsorship,
      onFilter: (value, record) => record.activeSponsorship.includes(value),
    },
    {
      title: "Business Profile",
      dataIndex: "businessProfile", // Data key for name
      key: "businessProfile",
      sorter: (a, b) => a.businessProfile - b.businessProfile,
      onFilter: (value, record) => record.businessProfile.includes(value),
    },
    {
      title: "Event Created",
      dataIndex: "eventCreated", // Data key for eventCreated
      key: "eventCreated",

      sorter: (a, b) => a.eventCreated - b.eventCreated,
      onFilter: (value, record) => record.eventCreated.includes(value),
    },
    {
      title: "Credit",
      dataIndex: "credit", // Data key for memberType
      key: "credit",
      render: (credit) => `$${credit}`,
      sorter: (a, b) => a.credit - b.credit,
      onFilter: (value, record) => record.credit.includes(value),
    },
    {
      title: "Job Posted ",
      dataIndex: "jobPosted", // Data key for jobPosted
      key: "jobPosted",
      sorter: (a, b) => a.jobPosted - b.jobPosted,
      onFilter: (value, record) => record.jobPosted.includes(value),
    },
    {
      title: "Followers",
      dataIndex: "followers", // Data key for followers
      key: "followers",

      sorter: (a, b) => a.followers - b.followers,
      onFilter: (value, record) => record.followers.includes(value),
    },
    {
      title: "Likes",
      dataIndex: "likes", // Data key for likes
      key: "likes",

      sorter: (a, b) => a.likes - b.likes,
      onFilter: (value, record) => record.likes.includes(value),
    },
    {
      title: "Supported Events",
      dataIndex: "supportedEvents", // Data key for supportedEvents
      key: "supportedEvents",

      sorter: (a, b) => a.supportedEvents - b.supportedEvents,
      onFilter: (value, record) => record.supportedEvents.includes(value),
    },
    {
      title: "Additional Services",
      dataIndex: "additionalServices", // Data key for additionalServices
      key: "additionalServices",

      sorter: (a, b) => a.additionalServices - b.additionalServices,
      onFilter: (value, record) => record.additionalServices.includes(value),
    },
    {
      title: "Reviews ",
      dataIndex: "reviews", // Data key for reviews
      key: "reviews",
      sorter: (a, b) => a.reviews - b.reviews,
      onFilter: (value, record) => record.reviews.includes(value),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color"
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>

            {/* Block User Tooltip */}
            {record?.isBanned ? (
              <Tooltip placement="left" title="Unblock this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-base-color"
                  onClick={() => showUnblockModal(record)}
                >
                  <CgUnblock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            ) : (
              <Tooltip placement="left" title="Block this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color"
                  onClick={() => showBlockModal(record)}
                >
                  <MdBlock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            )}
          </Space>
        </>
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
      keyValue={"email"}
    />
  );
};

export default AllBusinessUserTable;
