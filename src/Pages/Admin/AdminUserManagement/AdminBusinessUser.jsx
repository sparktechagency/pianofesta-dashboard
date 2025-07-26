"use client";

import { useState, useMemo } from "react";
import BusinessUserModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserModal";
import BusinessUserBlockModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserBlockModal";
import BusinessUserUnblockModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserUnblockModal";
import AllBusinessUserTable from "../../../Components/UI/Tables/BusinessUserTable";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import SearchInput from "../../../utils/SearchInput";
import { BiExport } from "react-icons/bi";
import * as XLSX from "xlsx";
import { useBusinessUserQuery } from "../../../redux/features/userManagement/userManagementApi";
import dayjs from "dayjs";

const AdminBusinessUser = () => {
  const { data, isFetching } = useBusinessUserQuery();

  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Filters state
  const [filterFromDate, setFilterFromDate] = useState(null);
  const [filterToDate, setFilterToDate] = useState(null);
  const [filterWebsite, setFilterWebsite] = useState("all");
  const [filterCreatedDate, setFilterCreatedDate] = useState("all");
  const [filterSponsorship, setFilterSponsorship] = useState("all");
  const [filterEventCreated, setFilterEventCreated] = useState("all");
  const [filterJobPosted, setFilterJobPosted] = useState("all");
  const [filterCredit, setFilterCredit] = useState("all");
  const [filterFollowers, setFilterFollowers] = useState("all");
  const [filterLikes, setFilterLikes] = useState("all");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };

  const showUnblockModal = (record) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const businessUsers = data?.data;

  const filteredUsers = useMemo(() => {
    return businessUsers
      ?.filter((user) => {
        // Search filtering (case insensitive on name, sureName, customId)
        if (searchText) {
          const searchLower = searchText.toLowerCase();
          const name = user?.name?.toLowerCase() ?? "";
          const sureName = user?.sureName?.toLowerCase() ?? "";
          if (!name.includes(searchLower) && !sureName.includes(searchLower)) {
            return false;
          }
        }

        // Date range filtering on createdAt
        const createdAt = user?.createdAt ? dayjs(user.createdAt) : null;
        if (
          filterFromDate &&
          createdAt &&
          createdAt.isBefore(dayjs(filterFromDate).startOf("day"))
        ) {
          return false;
        }
        if (
          filterToDate &&
          createdAt &&
          createdAt.isAfter(dayjs(filterToDate).endOf("day"))
        ) {
          return false;
        }

        // Website filter - adjust to your actual data structure
        if (filterWebsite !== "all") {
          const hasWebsite = !!user?.hasWebsite;
          if (filterWebsite === "yes" && !hasWebsite) return false;
          if (filterWebsite === "no" && hasWebsite) return false;
        }

        // Sponsorship filter
        if (filterSponsorship !== "all") {
          const isSponsored =
            user?.activeSponsorship && user.activeSponsorship !== "none";
          if (filterSponsorship === "yes" && !isSponsored) return false;
          if (filterSponsorship === "no" && isSponsored) return false;
        }

        // Keep all for sorting filters
        return true;
      })
      .sort((a, b) => {
        if (filterCreatedDate !== "all") {
          const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
          return filterCreatedDate === "asc" ? dateA - dateB : dateB - dateA;
        }
        if (filterEventCreated !== "all") {
          const evA = a?.totalEvent ?? 0;
          const evB = b?.totalEvent ?? 0;
          return filterEventCreated === "asc" ? evA - evB : evB - evA;
        }
        if (filterJobPosted !== "all") {
          const jobA = a?.totalJob ?? 0;
          const jobB = b?.totalJob ?? 0;
          return filterJobPosted === "asc" ? jobA - jobB : jobB - jobA;
        }
        if (filterCredit !== "all") {
          const creditA = a?.totalCredit ?? 0;
          const creditB = b?.totalCredit ?? 0;
          return filterCredit === "asc" ? creditA - creditB : creditB - creditA;
        }
        if (filterFollowers !== "all") {
          const folA = a?.totalFollowers ?? 0;
          const folB = b?.totalFollowers ?? 0;
          return filterFollowers === "asc" ? folA - folB : folB - folA;
        }
        if (filterLikes !== "all") {
          const likeA = a?.totalLikes ?? 0;
          const likeB = b?.totalLikes ?? 0;
          return filterLikes === "asc" ? likeA - likeB : likeB - likeA;
        }
        return 0;
      });
  }, [
    businessUsers,
    searchText,
    filterFromDate,
    filterToDate,
    filterWebsite,
    filterCreatedDate,
    filterSponsorship,
    filterEventCreated,
    filterJobPosted,
    filterCredit,
    filterFollowers,
    filterLikes,
  ]);

  const exportToExcel = () => {
    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Selected Business Users"
      );
      XLSX.writeFile(workbook, "selected_business_users.xlsx");
    } else {
      alert("Please select some users to export.");
    }
  };

  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Business User List
            </p>
          </div>
          <div className="flex justify-between items-start gap-4 mb-7">
            <div
              className={`${
                showFilter ? "flex" : "hidden"
              } flex items-center justify-start flex-wrap gap-4`}
            >
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  From
                </Typography.Text>
                <DatePicker
                  className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                  placeholder={"From Date"}
                  onChange={(date) => setFilterFromDate(date)}
                  value={filterFromDate}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  To
                </Typography.Text>
                <DatePicker
                  className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                  placeholder={"To Date"}
                  onChange={(date) => setFilterToDate(date)}
                  value={filterToDate}
                />
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorIcon: "#F9FAFB",
                      colorBgContainer: "rgba(0,0,0,0)",
                      fontSize: 20,
                      optionSelectedColor: "#6A0DAD",
                      optionSelectedBg: "#F9FAFB",
                      optionActiveColor: "#F9FAFB",
                      colorBorder: "#6A0DAD",
                      colorBgElevated: "#FFFFFF",
                      selectorBg: "#FFFFFF",
                      colorText: "#3a3a3a",
                      colorTextPlaceholder: "#B5B5B5",
                      zIndexPopup: 990,
                    },
                  },
                }}
              >
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Website
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterWebsite(val)}
                    value={filterWebsite}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="yes">Yes</Select.Option>
                    <Select.Option value="no">No</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Created Date
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterCreatedDate(val)}
                    value={filterCreatedDate}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="asc">ASC</Select.Option>
                    <Select.Option value="desc">DESC</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Sponsorship
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterSponsorship(val)}
                    value={filterSponsorship}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="yes">Yes</Select.Option>
                    <Select.Option value="no">No</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Event Created
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterEventCreated(val)}
                    value={filterEventCreated}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="asc">ASC</Select.Option>
                    <Select.Option value="desc">DESC</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Job Posted
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterJobPosted(val)}
                    value={filterJobPosted}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="asc">ASC</Select.Option>
                    <Select.Option value="desc">DESC</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Credit
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterCredit(val)}
                    value={filterCredit}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="asc">ASC</Select.Option>
                    <Select.Option value="desc">DESC</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Followers
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterFollowers(val)}
                    value={filterFollowers}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="asc">ASC</Select.Option>
                    <Select.Option value="desc">DESC</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    Likes
                  </Typography.Text>
                  <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={(val) => setFilterLikes(val)}
                    value={filterLikes}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="asc">ASC</Select.Option>
                    <Select.Option value="desc">DESC</Select.Option>
                  </Select>
                </div>
              </ConfigProvider>
            </div>
            <div
              className={`${
                showFilter ? "w-fit" : "w-full"
              } flex justify-end select-none`}
            >
              <FaFilter
                onClick={() => setShowFilter(!showFilter)}
                className="text-2xl text-secondary-color cursor-pointer "
              />
            </div>
          </div>
        </div>
        {/* Search and Export Button */}
        <div className="flex items-center justify-between mb-7">
          <SearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
          <Button
            onClick={exportToExcel}
            disabled={selectedData?.length === 0}
            className="flex items-center gap-2 !bg-secondary-color !border-secondary-color text-primary-color !py-4"
          >
            <BiExport className="text-xl text-white" />
            <p className="text-lg text-white font-semibold">Export</p>
          </Button>
        </div>
        <AllBusinessUserTable
          data={filteredUsers}
          loading={isFetching}
          showViewModal={showViewModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={filteredUsers?.length}
          limit={limit}
          setSelectedData={setSelectedData} // Pass setSelectedData from parent
          rowSelectionOn={true} // Enable row selection
        />
        <BusinessUserModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <BusinessUserBlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <BusinessUserUnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminBusinessUser;
