"use client";

import { useState, useMemo } from "react";
import AllUserTable from "../../../Components/UI/Tables/UserTable";
import UserModal from "../../../Components/UI/Modal/User/UserModal";
import UserBlockModal from "../../../Components/UI/Modal/User/UserBlockModal";
import UserUnblockModal from "../../../Components/UI/Modal/User/UserUnblockModal";
import SearchInput from "../../../utils/SearchInput";
import { BiExport } from "react-icons/bi";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useRegularUserQuery } from "../../../redux/features/userManagement/userManagementApi";
import dayjs from "dayjs";

const AdminAllUsers = () => {
  const { data, isFetching } = useRegularUserQuery();
  const regularUsers = useMemo(() => data?.data || [], [data]);

  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const [createdSortOrder, setCreatedSortOrder] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const limit = 12;

  const showViewUserModal = (record) => {
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

  const exportToExcel = () => {
    if ((selectedData?.length || 0) > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Users");
      XLSX.writeFile(workbook, "selected_users.xlsx");
    } else {
      alert("Please select some users to export.");
    }
  };

  const filteredUsers = useMemo(() => {
    return regularUsers
      ?.filter((user) => {
        const fullName = `${user?.name || ""} ${
          user?.sureName || ""
        }`.toLowerCase();
        const matchSearch =
          fullName.includes(searchText.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchText.toLowerCase());

        const matchGender =
          genderFilter === "all" || user?.gender === genderFilter;

        const userDate = dayjs(user?.createdAt);
        const matchDate =
          (!fromDate ||
            userDate.isSame(fromDate, "day") ||
            userDate.isAfter(fromDate)) &&
          (!toDate ||
            userDate.isSame(toDate, "day") ||
            userDate.isBefore(toDate));

        return matchSearch && matchGender && matchDate;
      })
      ?.sort((a, b) => {
        const aDate = new Date(a?.createdAt);
        const bDate = new Date(b?.createdAt);

        if (createdSortOrder === "asc") return aDate - bDate;
        if (createdSortOrder === "desc") return bDate - aDate;
        return 0;
      });
  }, [
    regularUsers,
    searchText,
    genderFilter,
    fromDate,
    toDate,
    createdSortOrder,
  ]);

  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full py-5 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              User List
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-start gap-4 mb-7">
          <div className={`${showFilter ? "flex" : "hidden"} flex-wrap gap-4`}>
            <div className="flex flex-col gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                From
              </Typography.Text>
              <DatePicker
                onChange={(date) => setFromDate(date)}
                className="!rounded-lg !text-base !bg-primary-color !border shadow-none !text-base-color"
                placeholder="From Date"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                To
              </Typography.Text>
              <DatePicker
                onChange={(date) => setToDate(date)}
                className="!rounded-lg !text-base !bg-primary-color !border shadow-none !text-base-color"
                placeholder="To Date"
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
                    colorBorder: "#6A0DAD",
                    selectorBg: "#FFFFFF",
                    colorText: "#3a3a3a",
                    colorTextPlaceholder: "#B5B5B5",
                    zIndexPopup: 990,
                  },
                },
              }}
            >
              <div className="flex flex-col gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Created Date
                </Typography.Text>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  onChange={(value) => setCreatedSortOrder(value)}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="asc">ASC</Select.Option>
                  <Select.Option value="desc">DESC</Select.Option>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Gender
                </Typography.Text>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  onChange={(value) => setGenderFilter(value)}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </div>
            </ConfigProvider>
          </div>

          <div
            className={`${showFilter ? "w-fit" : "w-full"} flex justify-end`}
          >
            <FaFilter
              onClick={() => setShowFilter(!showFilter)}
              className="text-2xl text-secondary-color cursor-pointer"
            />
          </div>
        </div>

        {/* Search + Export */}
        <div className="flex items-center justify-between mb-7">
          <SearchInput
            placeholder="Search by name, email"
            setSearch={setSearchText}
            setPage={setPage}
          />
          <Button
            onClick={exportToExcel}
            disabled={(selectedData?.length || 0) === 0}
            className="flex items-center gap-2 !bg-secondary-color !border-secondary-color text-primary-color !py-4"
          >
            <BiExport className="text-xl text-white" />
            <p className="text-lg text-white font-semibold">Export</p>
          </Button>
        </div>

        <AllUserTable
          data={filteredUsers}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={filteredUsers?.length || 0}
          limit={limit}
          setSelectedData={setSelectedData}
          rowSelectionOn={true}
        />

        <UserModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <UserBlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <UserUnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminAllUsers;
