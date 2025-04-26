import { useState } from "react";
import businessData from "../../../../public/data/BusinessData";
import BusinessUserModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserModal";
import BusinessUserBlockModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserBlockModal";
import BusinessUserUnblockModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserUnblockModal";
import AllBusinessUserTable from "../../../Components/UI/Tables/BusinessUserTable";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import SearchInput from "../../../utils/SearchInput";
import { BiExport } from "react-icons/bi";
import * as XLSX from "xlsx";

const AdminBusinessUser = () => {
  const data = businessData;
  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

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

  const exportToExcel = () => {
    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData); // Convert the selected data to a worksheet
      const workbook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Selected Business Users"
      ); // Append the worksheet to the workbook
      XLSX.writeFile(workbook, "selected_business_users.xlsx"); // Write the workbook to a file
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
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Business User List
            </p>
          </div>
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
        <AllBusinessUserTable
          data={data}
          loading={false}
          showViewModal={showViewModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={data.length}
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
