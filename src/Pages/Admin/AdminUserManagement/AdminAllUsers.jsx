import { useState } from "react";
import userData from "../../../../public/data/Users";
import AllUserTable from "../../../Components/UI/Tables/UserTable";
import UserModal from "../../../Components/UI/Modal/User/UserModal";
import UserBlockModal from "../../../Components/UI/Modal/User/UserBlockModal";
import UserUnblockModal from "../../../Components/UI/Modal/User/UserUnblockModal";
import SearchInput from "../../../utils/SearchInput";
import { BiExport } from "react-icons/bi";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";

const AdminAllUsers = () => {
  const data = userData;
  const [showFilter, setShowFilter] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

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
    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData); // Convert the selected data to a worksheet
      const workbook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Users"); // Append the worksheet to the workbook
      XLSX.writeFile(workbook, "selected_users.xlsx"); // Write the workbook to a file
    } else {
      alert("Please select some users to export.");
    }
  };

  console.log("selectedRowKeys", selectedData);
  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full py-5   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              User List
            </p>
          </div>
        </div>
        {/* Filtre  */}
        <div className="flex justify-between items-start gap-4 mb-7">
          <div
            className={`${
              showFilter ? "flex" : "hidden"
            }  flex items-center justify-start flex-wrap gap-4`}
          >
            <div className="flex flex-col items-start gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                From
              </Typography.Text>
              <DatePicker
                className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                placeholder={"From Date"}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                To
              </Typography.Text>
              <DatePicker
                className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                placeholder={"To Date"}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                Gender
              </Typography.Text>
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
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </ConfigProvider>
            </div>
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
        {/* Search and Export Button */}
        <div className=" flex items-center justify-between mb-7">
          <SearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
          <Button
            onClick={exportToExcel}
            disabled={selectedData.length === 0}
            className="flex items-center gap-2 !bg-secondary-color !border-secondary-color text-primary-color !py-4"
          >
            <BiExport className="text-xl text-white" />
            <p className="text-lg text-white font-semibold">Export</p>
          </Button>
        </div>
        <AllUserTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
          setSelectedData={setSelectedData} // Pass setSelectedData from parent
          rowSelectionOn={true} // Enable row selection
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
