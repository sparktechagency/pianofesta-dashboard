import { useState } from "react";
import { DatePicker, Select, Typography, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import * as XLSX from "xlsx";

import { useEventListingQuery } from "../../../redux/features/listing/listingApi";
import AdminListingEventTable from "../../../Components/ui/Tables/AdminListing/AdminListingEventTable";
import AdminListingModal from "../../../Components/ui/Modal/AdminListingModal/AdminEventListingModal";
import AdminEventListingDeleteModal from "../../../Components/ui/Modal/AdminListingModal/AdminEventListingDeleteModal";
import SearchInput from "../../../utils/SearchInput";

const AdminEventListing = () => {
  const { data, isFetching } = useEventListingQuery();
  const eventListingData = data?.data || [];

  const [showFilter, setShowFilter] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 10;
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    createdFrom: null,
    createdTo: null,
    startDateSort: "all",
    endDateSort: "all",
    startTimeSort: "all",
    endTimeSort: "all",
    address: "all",
    category: "all",
    promotionImg: "all",
    participantsSort: "all",
    entranceFeeSort: "all",
    typeSort: "all",
    likesSort: "all",
    commentsSort: "all",
    ratingSort: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const exportToExcel = () => {
    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Events");
      XLSX.writeFile(workbook, "selected_events.xlsx");
    } else {
      alert("Please select some events to export.");
    }
  };

  const uniqueTypes = Array.from(
    new Set(eventListingData.map((event) => event.type))
  ).filter(Boolean);
  const uniqueCategories = Array.from(
    new Set(eventListingData.map((event) => event.category))
  ).filter(Boolean);

  const getFilteredData = () => {
    return eventListingData
      .filter((event) => {
        const matchesSearch =
          searchText.trim() === "" ||
          Object.values(event).some((val) =>
            String(val).toLowerCase().includes(searchText.toLowerCase())
          );

        if (!matchesSearch) return false;

        if (
          filters.fromDate &&
          new Date(event.startDate) < new Date(filters.fromDate)
        )
          return false;
        if (
          filters.toDate &&
          new Date(event.endDate) > new Date(filters.toDate)
        )
          return false;
        if (
          filters.createdFrom &&
          new Date(event.createdAt) < new Date(filters.createdFrom)
        )
          return false;
        if (
          filters.createdTo &&
          new Date(event.createdAt) > new Date(filters.createdTo)
        )
          return false;
        if (
          filters.address !== "all" &&
          !!event.address !== (filters.address === "yes")
        )
          return false;
        if (filters.category !== "all" && event.category !== filters.category)
          return false;

        return true;
      })
      .sort((a, b) => {
        const sortByKey = (key, dir) => {
          if (dir === "asc") return a[key] > b[key] ? 1 : -1;
          if (dir === "desc") return a[key] < b[key] ? 1 : -1;
          return 0;
        };

        return (
          sortByKey("startDate", filters.startDateSort) ||
          sortByKey("endDate", filters.endDateSort) ||
          sortByKey("startTime", filters.startTimeSort) ||
          sortByKey("endTime", filters.endTimeSort) ||
          sortByKey("maxParticipants", filters.participantsSort) ||
          sortByKey("entranceFee", filters.entranceFeeSort) ||
          sortByKey("type", filters.typeSort) ||
          sortByKey("totalLikes", filters.likesSort) ||
          sortByKey("totalComments", filters.commentsSort) ||
          sortByKey("averageRating", filters.ratingSort)
        );
      });
  };

  return (
    <div
      className="mt-5 bg-primary-color rounded-xl px-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="bg-primary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
        <div className="flex items-center justify-between my-5">
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
            Event
          </p>
        </div>
      </div>

      {/* Filter toggle */}
      <div className="flex justify-between items-start gap-4 mb-7">
        <div
          className={`${
            showFilter ? "flex" : "hidden"
          } flex flex-wrap items-center gap-4`}
        >
          {/* Date Range Filters */}
          {[
            { label: "From", key: "fromDate" },
            { label: "To", key: "toDate" },
            { label: "Created From", key: "createdFrom" },
            { label: "Created To", key: "createdTo" },
          ].map(({ label, key }) => (
            <div className="flex flex-col gap-1" key={key}>
              <Typography.Text className="text-base-color font-semibold">
                {label}
              </Typography.Text>
              <DatePicker
                className="!rounded-lg !bg-primary-color !border !text-base-color"
                placeholder={`${label} Date`}
                onChange={(date) => handleFilterChange(key, date)}
              />
            </div>
          ))}

          {/* Sort Filters */}
          {[
            { label: "Start Date", key: "startDateSort" },
            { label: "End Date", key: "endDateSort" },
            { label: "Start Time", key: "startTimeSort" },
            { label: "End Time", key: "endTimeSort" },
            { label: "Participants", key: "participantsSort" },
            { label: "Entrance Fee", key: "entranceFeeSort" },
            { label: "Likes", key: "likesSort" },
            { label: "Comments", key: "commentsSort" },
            { label: "Rating", key: "ratingSort" },
          ].map(({ label, key }) => (
            <div className="flex flex-col gap-1" key={key}>
              <Typography.Text className="text-base-color font-semibold">
                {label}
              </Typography.Text>
              <Select
                defaultValue="all"
                onChange={(val) => handleFilterChange(key, val)}
                style={{ width: 150 }}
                className="!h-10"
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="asc">ASC</Select.Option>
                <Select.Option value="desc">DESC</Select.Option>
              </Select>
            </div>
          ))}

          {/* Boolean & Dynamic Filters */}
          {[
            {
              label: "Address",
              key: "address",
              options: ["yes", "no"],
            },
            {
              label: "Category",
              key: "category",
              options: uniqueCategories,
            },
            {
              label: "Type",
              key: "typeSort",
              options: uniqueTypes,
            },
          ].map(({ label, key, options }) => (
            <div className="flex flex-col gap-1" key={key}>
              <Typography.Text className="text-base-color font-semibold">
                {label}
              </Typography.Text>
              <Select
                defaultValue="all"
                onChange={(val) => handleFilterChange(key, val)}
                style={{ width: 150 }}
                className="!h-10"
              >
                <Select.Option value="all">All</Select.Option>
                {options.map((opt) => (
                  <Select.Option key={opt} value={opt}>
                    {opt?.[0]?.toUpperCase() + opt?.slice(1)}
                  </Select.Option>
                ))}
              </Select>
            </div>
          ))}
        </div>

        <div className={`${showFilter ? "w-fit" : "w-full"} flex justify-end`}>
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
          type="primary"
          disabled={selectedData.length === 0}
          className="flex items-center gap-2 !bg-secondary-color !border-secondary-color text-primary-color !py-4"
        >
          <BiExport className="text-xl text-white" />
          <p className="text-lg text-white font-semibold">Export</p>
        </Button>
      </div>

      {/* Table and Modals */}
      <AdminListingEventTable
        data={getFilteredData()}
        loading={isFetching}
        showViewModal={showViewUserModal}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={getFilteredData().length}
        limit={limit}
        setSelectedData={setSelectedData}
      />
      <AdminListingModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <AdminEventListingDeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminEventListing;
