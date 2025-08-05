import { useState } from "react";
import EarningTable from "../../Components/UI/Tables/EarningTable";
import EarningModal from "../../Components/UI/Modal/Earning/EarningModal";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import SearchInput from "../../utils/SearchInput";
import { BiExport } from "react-icons/bi";
import * as XLSX from "xlsx";
import { useAllEarningQuery } from "../../redux/features/earning/earningApi";

const AdminEarning = () => {
  const { data, isFetching } = useAllEarningQuery();
  const earningData = data?.data || [];

  const [showFilter, setShowFilter] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // Filter states
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [purchaseDateSort, setPurchaseDateSort] = useState("all");
  const [endDateSort, setEndDateSort] = useState("all");
  const [amountSort, setAmountSort] = useState("all");
  const [remainingDaysSort, setRemainingDaysSort] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Earnings");
      XLSX.writeFile(workbook, "selected_earnings.xlsx");
    } else {
      alert("Please select some users to export.");
    }
  };

  // Filtering and sorting
  const filteredData = earningData
    .filter((item) => {
      if (searchText) {
        const values = Object.values(item).join(" ").toLowerCase();
        if (!values.includes(searchText.toLowerCase())) return false;
      }
      if (fromDate && new Date(item.purchaseDate) < new Date(fromDate))
        return false;
      if (toDate && new Date(item.purchaseDate) > new Date(toDate))
        return false;
      if (
        planFilter !== "all" &&
        item.plan.toLowerCase() !== planFilter.toLowerCase()
      )
        return false;
      if (
        statusFilter !== "all" &&
        item.status.toLowerCase() !== statusFilter.toLowerCase()
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      const sortField = (field, order) => {
        const valA =
          typeof a[field] === "string" ? a[field].toLowerCase() : a[field];
        const valB =
          typeof b[field] === "string" ? b[field].toLowerCase() : b[field];
        if (order === "asc") return valA > valB ? 1 : -1;
        if (order === "desc") return valA < valB ? 1 : -1;
        return 0;
      };

      let result = 0;
      if (purchaseDateSort !== "all")
        result = sortField("purchaseDate", purchaseDateSort);
      if (result === 0 && endDateSort !== "all")
        result = sortField("endDate", endDateSort);
      if (result === 0 && amountSort !== "all")
        result = sortField("amount", amountSort);
      if (result === 0 && remainingDaysSort !== "all")
        result = sortField("remainingday", remainingDaysSort);
      return result;
    });

  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Earnings
            </p>
          </div>
        </div>

        {/* Filter section */}
        <div className="flex justify-between items-start gap-4 mb-7">
          <div
            className={`${
              showFilter ? "flex" : "hidden"
            } flex flex-wrap items-center gap-4`}
          >
            <div className="flex flex-col gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                From
              </Typography.Text>
              <DatePicker
                className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                placeholder={"From Date"}
                onChange={(_, dateStr) => setFromDate(dateStr)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                To
              </Typography.Text>
              <DatePicker
                className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                placeholder={"To Date"}
                onChange={(_, dateStr) => setToDate(dateStr)}
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
              {[
                {
                  label: "Purchase Date",
                  value: purchaseDateSort,
                  setter: setPurchaseDateSort,
                },
                {
                  label: "End Date",
                  value: endDateSort,
                  setter: setEndDateSort,
                },
                {
                  label: "Amount",
                  value: amountSort,
                  setter: setAmountSort,
                },
                {
                  label: "Remaining Days",
                  value: remainingDaysSort,
                  setter: setRemainingDaysSort,
                },
                {
                  label: "Plan",
                  value: planFilter,
                  setter: setPlanFilter,
                  options: ["all", "basic", "pro", "premium", "elite"],
                },
                {
                  label: "Status",
                  value: statusFilter,
                  setter: setStatusFilter,
                  options: ["all", "active", "inactive", "completed"],
                },
              ].map(({ label, value, setter, options }) => (
                <div key={label} className="flex flex-col gap-1">
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    {label}
                  </Typography.Text>
                  <Select
                    defaultValue={value}
                    style={{ width: 150 }}
                    className="!h-10"
                    onChange={setter}
                  >
                    {(options || ["all", "asc", "desc"]).map((opt) => (
                      <Select.Option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              ))}
            </ConfigProvider>
          </div>

          <div
            className={`${
              showFilter ? "w-fit" : "w-full"
            } flex justify-end select-none`}
          >
            <FaFilter
              onClick={() => setShowFilter(!showFilter)}
              className="text-2xl text-secondary-color cursor-pointer"
            />
          </div>
        </div>

        {/* Search and Export */}
        <div className="flex items-center justify-between mb-7">
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
          data={filteredData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={filteredData.length}
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
