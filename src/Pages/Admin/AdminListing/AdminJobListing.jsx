import { useMemo, useState } from "react";
import AdminBusinessListingDeleteModal from "../../../Components/ui/Modal/AdminListingModal/AdminBusinessListingDeleteModal";
import AdminJobListingTable from "../../../Components/ui/Tables/AdminListing/AdminJonListingTable";
import SearchInput from "../../../utils/SearchInput";
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { BiExport } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useJobListingQuery } from "../../../redux/features/listing/listingApi";

const AdminJobListing = () => {
  const { data, isFetching } = useJobListingQuery();
  const jobListingData = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  const [showFilter, setShowFilter] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    createdFrom: null,
    createdTo: null,
    role: "all",
    detailDescription: "all",
    contractType: "all",
    salarySort: "all",
    availability: "all",
    experience: "all",
    workHour: "all",
    faqSort: "all",
    commentsSort: "all",
    ratingSort: "all",
  });

  // Extract unique roles dynamically from data for Role filter
  const roles = useMemo(() => {
    const uniqueRoles = new Set();
    jobListingData.forEach((job) => {
      if (job.role) uniqueRoles.add(job.role);
    });
    return Array.from(uniqueRoles);
  }, [jobListingData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const exportToExcel = () => {
    if (selectedData.length === 0) {
      alert("Please select some jobs to export.");
      return;
    }

    const exportData = selectedData.map((job) => ({
      ID: job._id,
      Title: job.title,
      Email: job.email,
      Phone: job.phoneNumber,
      CreatedDate: job.createdAt
        ? new Date(job.createdAt).toLocaleDateString()
        : "",
      Address: job.address,
      Role: job.role,
      ContractType:
        job.contractType === "fullTime"
          ? "Full Time"
          : job.contractType === "partTime"
          ? "Part Time"
          : job.contractType === "freelance"
          ? "Freelance"
          : job.contractType || "N/A",
      Salary: job.salery ? `$${job.salery.toLocaleString()}` : "N/A",
      Experience: job.experience || "",
      WorkHours: job.workHour || "",
      FAQCount: Array.isArray(job.faq) ? job.faq.length : 0,
      AverageRating: job.averageRating?.toFixed(1) || "0.0",
      TotalComments: job.totalComments || 0,
      PostedBy: job.author?.name || "Unknown",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Jobs");
    XLSX.writeFile(workbook, "selected_jobs.xlsx");
  };

  const filteredData = useMemo(() => {
    let filtered = [...jobListingData];

    // Convert AntD DatePicker moment objects to Date for comparison
    const fromDateObj = filters.fromDate ? filters.fromDate.toDate() : null;
    const toDateObj = filters.toDate ? filters.toDate.toDate() : null;
    const createdFromObj = filters.createdFrom
      ? filters.createdFrom.toDate()
      : null;
    const createdToObj = filters.createdTo ? filters.createdTo.toDate() : null;

    if (fromDateObj)
      filtered = filtered.filter((b) => new Date(b.createdAt) >= fromDateObj);
    if (toDateObj)
      filtered = filtered.filter((b) => new Date(b.createdAt) <= toDateObj);
    if (createdFromObj)
      filtered = filtered.filter(
        (b) => new Date(b.createdAt) >= createdFromObj
      );
    if (createdToObj)
      filtered = filtered.filter((b) => new Date(b.createdAt) <= createdToObj);

    if (filters.role !== "all") {
      filtered = filtered.filter(
        (b) => b.role?.toLowerCase() === filters.role.toLowerCase()
      );
    }
    if (filters.detailDescription !== "all") {
      filtered = filtered.filter((b) =>
        filters.detailDescription === "yes" ? !!b.description : !b.description
      );
    }
    if (filters.contractType !== "all") {
      filtered = filtered.filter(
        (b) => b.contractType?.toLowerCase() === filters.contractType
      );
    }
    if (filters.availability !== "all") {
      filtered = filtered.filter((b) =>
        filters.availability === "asc"
          ? b.availability?.toLowerCase() === "immediate"
          : true
      );
    }
    if (filters.experience !== "all") {
      filtered = filtered.filter((b) => {
        if (filters.experience === "lessThan1")
          return b.experience?.includes("1");
        if (filters.experience === "moreThan5")
          return parseInt(b.experience) > 5;
        return b.experience?.includes(filters.experience);
      });
    }
    if (filters.workHour !== "all") {
      filtered = filtered.filter((b) => {
        const hour = Number(b.workHour);
        if (isNaN(hour)) return false;

        switch (filters.workHour) {
          case "1-10":
            return hour >= 1 && hour <= 10;
          case "11-20":
            return hour >= 11 && hour <= 20;
          case "21-40":
            return hour >= 21 && hour <= 40;
          case "40+":
            return hour > 40;
          default:
            return true;
        }
      });
    }

    const sortByNumber = (arr, accessorFn, direction) => {
      if (direction === "asc") {
        return [...arr].sort(
          (a, b) => (accessorFn(a) ?? 0) - (accessorFn(b) ?? 0)
        );
      }
      if (direction === "desc") {
        return [...arr].sort(
          (a, b) => (accessorFn(b) ?? 0) - (accessorFn(a) ?? 0)
        );
      }
      return arr;
    };

    if (filters.salarySort !== "all") {
      filtered = sortByNumber(filtered, (b) => b.salery, filters.salarySort);
    }
    if (filters.faqSort !== "all") {
      filtered = sortByNumber(filtered, (b) => b.faq?.length, filters.faqSort);
    }
    if (filters.commentsSort !== "all") {
      filtered = sortByNumber(
        filtered,
        (b) => b.totalComments,
        filters.commentsSort
      );
    }
    if (filters.ratingSort !== "all") {
      filtered = sortByNumber(
        filtered,
        (b) => b.averageRating,
        filters.ratingSort
      );
    }

    if (searchText.trim() !== "") {
      const lowerSearch = searchText.trim().toLowerCase();
      filtered = filtered.filter((b) => {
        return (
          b.title?.toLowerCase().includes(lowerSearch) ||
          b.role?.toLowerCase().includes(lowerSearch) ||
          b.address?.toLowerCase().includes(lowerSearch)
        );
      });
    }

    return filtered;
  }, [jobListingData, filters, searchText]);

  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        {/* Title */}
        <div className="bg-primary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Jobs
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-start gap-4 mb-7">
          <div
            className={`${
              showFilter ? "flex" : "hidden"
            } flex flex-wrap items-center justify-start gap-4`}
          >
            {/* Date Pickers */}
            <div className="flex flex-col items-start gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                From
              </Typography.Text>
              <DatePicker
                className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                placeholder={"From Date"}
                onChange={(date) => handleFilterChange("fromDate", date)}
                value={filters.fromDate}
                allowClear
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Typography.Text className="text-lg text-base-color font-semibold">
                To
              </Typography.Text>
              <DatePicker
                className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                placeholder={"To Date"}
                onChange={(date) => handleFilterChange("toDate", date)}
                value={filters.toDate}
                allowClear
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
              {/* Created From / To */}
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Created From
                </Typography.Text>
                <DatePicker
                  className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                  placeholder={"Created From Date"}
                  onChange={(date) => handleFilterChange("createdFrom", date)}
                  value={filters.createdFrom}
                  allowClear
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Created To
                </Typography.Text>
                <DatePicker
                  className="!rounded-lg !text-base !w-fit !bg-primary-color !border !shadow-none !text-base-color"
                  placeholder={"Created To Date"}
                  onChange={(date) => handleFilterChange("createdTo", date)}
                  value={filters.createdTo}
                  allowClear
                />
              </div>

              {/* Select filters */}
              {[
                { label: "Role", key: "role", options: ["all", ...roles] },
                {
                  label: "Detail Description",
                  key: "detailDescription",
                  options: ["all", "yes", "no"],
                },
                {
                  label: "Contract Type",
                  key: "contractType",
                  options: ["all", "fullTime", "partTime", "freelance"],
                },
                {
                  label: "Salary",
                  key: "salarySort",
                  options: ["all", "asc", "desc"],
                },
                {
                  label: "Availability",
                  key: "availability",
                  options: ["all", "asc"],
                },
                {
                  label: "Experience",
                  key: "experience",
                  options: [
                    "all",
                    "lessThan1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "moreThan5",
                  ],
                },
                {
                  label: "Work Hour (weekly)",
                  key: "workHour",
                  options: ["all", "1-10", "11-20", "21-40", "40+"],
                },
                {
                  label: "FAQ",
                  key: "faqSort",
                  options: ["all", "asc", "desc"],
                },
                {
                  label: "Comments",
                  key: "commentsSort",
                  options: ["all", "asc", "desc"],
                },
                {
                  label: "Rating",
                  key: "ratingSort",
                  options: ["all", "asc", "desc"],
                },
              ].map(({ label, key, options }) => (
                <div className="flex flex-col items-start gap-1" key={key}>
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    {label}
                  </Typography.Text>
                  <Select
                    value={filters[key]}
                    onChange={(val) => handleFilterChange(key, val)}
                    style={{ width: 150 }}
                    className="!h-10"
                    allowClear={false}
                  >
                    {options.map((opt) => (
                      <Select.Option key={opt} value={opt}>
                        {opt}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              ))}
            </ConfigProvider>
          </div>

          {/* Filter toggle */}
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
            placeholder="Search..."
            setSearch={setSearchText}
            setPage={setPage}
          />
          <Button
            onClick={exportToExcel}
            type="primary"
            className="flex items-center gap-2 !bg-secondary-color !border-secondary-color text-primary-color !py-4"
            disabled={selectedData.length === 0}
          >
            <BiExport className="text-xl text-white" />
            <span className="text-lg text-white font-semibold">Export</span>
          </Button>
        </div>
        {/* Table */}
        <AdminJobListingTable
          data={filteredData.slice((page - 1) * limit, page * limit)}
          loading={isFetching}
          showDeleteModal={(record) => {
            setCurrentRecord(record);
            setIsDeleteModalVisible(true);
          }}
          setPage={setPage}
          page={page}
          total={filteredData.length}
          limit={limit}
          setSelectedData={setSelectedData}
        />
        {/* Delete Modal */}
        <AdminBusinessListingDeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={() => {
            setIsDeleteModalVisible(false);
            setCurrentRecord(null);
          }}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminJobListing;
