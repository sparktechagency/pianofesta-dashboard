import { useState } from "react";
import earningData from "../../../public/data/earningData";
import EarningTable from "../../Components/UI/Tables/EarningTable";
import EarningModal from "../../Components/UI/Modal/Earning/EarningModal";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import SearchInput from "../../utils/SearchInput";
import { BiExport } from "react-icons/bi";
import * as XLSX from "xlsx";

const AdminEarning = () => {
  const data = earningData;
  const [showFilter, setShowFilter] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  const exportToExcel = () => {
    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData); // Convert the selected data to a worksheet
      const workbook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Earnings"); // Append the worksheet to the workbook
      XLSX.writeFile(workbook, "selected_earnings.xlsx"); // Write the workbook to a file
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
              Earnings
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
                  Purchase Date
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
                  End Date
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
                  Amount
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
                  Remaining Days
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
                  Plan
                </Typography.Text>

                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="basic">Basic</Select.Option>
                  <Select.Option value="pro">Pro</Select.Option>
                  <Select.Option value="premium">Premium</Select.Option>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Status
                </Typography.Text>

                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
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
            disabled={selectedData.length === 0}
            className="flex items-center gap-2 !bg-secondary-color !border-secondary-color text-primary-color !py-4"
          >
            <BiExport className="text-xl text-white" />
            <p className="text-lg text-white font-semibold">Export</p>
          </Button>
        </div>
        <EarningTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
          setSelectedData={setSelectedData}
        />
        <EarningModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminEarning;
