import { useState } from "react";
import AdminBusinessListingDeleteModal from "../../../Components/UI/Modal/AdminListingModal/AdminBusinessListingDeleteModal";
import jobListingData from "../../../../public/data/jobListingData";
import AdminJobListingTable from "../../../Components/UI/Tables/AdminListing/AdminJonListingTable";
import SearchInput from "../../../utils/SearchInput";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { BiExport } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";

const AdminJobListing = () => {
  const data = jobListingData;
  const [showFilter, setShowFilter] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };
  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const exportToExcel = () => {
    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData); // Convert the selected data to a worksheet
      const workbook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Selected Business Profiles"
      ); // Append the worksheet to the workbook
      XLSX.writeFile(workbook, "selected_business_profiles.xlsx"); // Write the workbook to a file
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
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Jobs
            </p>
          </div>
        </div>
        {/* Filtre  */}
        <div className="flex justify-between items-start gap-4 mb-7">
          <div
            className={`${
              showFilter ? "flex" : "hidden"
            }  flex flex-wrap items-center justify-start gap-4`}
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
                  Created From
                </Typography.Text>
                <DatePicker
                  className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                  placeholder={"Created From Date"}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Created To
                </Typography.Text>
                <DatePicker
                  className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                  placeholder={"Created To Date"}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Job Role
                </Typography.Text>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="manager">Manager </Select.Option>
                  <Select.Option value="socialMediaManager">
                    Social Media Manager{" "}
                  </Select.Option>
                  <Select.Option value="assistant">Assistant </Select.Option>
                  <Select.Option value="coordinator">
                    Coordinator{" "}
                  </Select.Option>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Details Discription
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
                  Contract Type
                </Typography.Text>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="full">Full Time </Select.Option>
                  <Select.Option value="part">Part Time </Select.Option>
                  <Select.Option value="freelance">Freelance</Select.Option>
                </Select>
              </div>

              {/* Credit Dropdown */}
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Salary
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
                  Availability
                </Typography.Text>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="asc">Immediate</Select.Option>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Experience
                </Typography.Text>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="lessThan1">
                    Less than 1 year
                  </Select.Option>
                  <Select.Option value="2">2 year</Select.Option>
                  <Select.Option value="3">3 year</Select.Option>
                  <Select.Option value="4">4 year</Select.Option>
                  <Select.Option value="5">5 year</Select.Option>
                  <Select.Option value="moreThan5">
                    More than 5 year
                  </Select.Option>
                </Select>
              </div>

              {/* Followers Dropdown */}
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Work Hours
                </Typography.Text>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="1-3">1-3</Select.Option>
                  <Select.Option value="1-6">1-6</Select.Option>
                  <Select.Option value="1-9">1-9</Select.Option>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  FAQ
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
                  Comments
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

              {/* Likes Dropdown */}
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Rating
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
        {/* Search and Export Button */}
        <div className=" flex items-center justify-between mb-7">
          <SearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
          <Button
            onClick={exportToExcel}
            type="primary"
            disabled={selectedData.length === 0}
            className="flex items-center gap-2 !bg-secondary-color !border-secondary-color text-primary-color !py-4"
          >
            <BiExport className="text-xl text-white" />
            <p className="text-lg text-white font-semibold">Export</p>
          </Button>
        </div>
        <AdminJobListingTable
          data={data}
          loading={false}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
          setSelectedData={setSelectedData}
        />
        <AdminBusinessListingDeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminJobListing;
