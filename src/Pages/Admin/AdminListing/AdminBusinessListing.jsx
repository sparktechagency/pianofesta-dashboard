/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import AdminBusinessListingDeleteModal from "../../../Components/ui/Modal/AdminListingModal/AdminBusinessListingDeleteModal";
import BusinessUserModal from "../../../Components/ui/Modal/BusinessUser/BusinessUserModal";

import AdminBusinessListingTable from "../../../Components/ui/Tables/AdminListing/AdminBusinessListingTable";
// Removed SearchInput, replaced with plain <input>
import { Button, ConfigProvider, DatePicker, Select, Typography } from "antd";
import { BiExport } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useBusinessListingQuery } from "../../../redux/features/listing/listingApi";
import SearchInput from "../../../utils/SearchInput";

const AdminBusinessListing = () => {
  const { data, isFetching } = useBusinessListingQuery();
  const businessListingData = Array.isArray(data?.data) ? data.data : [];

  const [showFilter, setShowFilter] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchText, setSearchText] = useState("");

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    createdFrom: null,
    createdTo: null,
    shortDescription: "all",
    detailsDescription: "all",
    website: "all",
    facebook: "all",
    instagram: "all",
    startTimeSort: "all",
    endTimeSort: "all",
    address: "all",
    providerType: "all",
    promotionImg: "all",
    guest: "all",
    priceRangeSort: "all",
    followersSort: "all",
    likesSort: "all",
    commentsSort: "all",
    ratingSort: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Modal handlers
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

  // Export selected rows to Excel
  const exportToExcel = () => {
    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Selected Business Profiles"
      );
      XLSX.writeFile(workbook, "selected_business_profiles.xlsx");
    } else {
      alert("Please select some users to export.");
    }
  };

  // Safe sorting helpers (make a copy before sort)
  const sortByString = (arr, accessorFn, direction) => {
    const sorted = [...arr];
    if (direction === "asc") {
      return sorted.sort((a, b) =>
        (accessorFn(a) ?? "").localeCompare(accessorFn(b) ?? "")
      );
    }
    if (direction === "desc") {
      return sorted.sort((a, b) =>
        (accessorFn(b) ?? "").localeCompare(accessorFn(a) ?? "")
      );
    }
    return sorted;
  };

  const sortByNumber = (arr, accessorFn, direction) => {
    const sorted = [...arr];
    if (direction === "asc") {
      return sorted.sort((a, b) => (accessorFn(a) ?? 0) - (accessorFn(b) ?? 0));
    }
    if (direction === "desc") {
      return sorted.sort((a, b) => (accessorFn(b) ?? 0) - (accessorFn(a) ?? 0));
    }
    return sorted;
  };

  // Filtering and sorting logic with search fixed
  const filteredData = useMemo(() => {
    let filtered = [...businessListingData];

    // Date filters
    if (filters.fromDate)
      filtered = filtered.filter(
        (b) => new Date(b.createdAt) >= new Date(filters.fromDate)
      );
    if (filters.toDate)
      filtered = filtered.filter(
        (b) => new Date(b.createdAt) <= new Date(filters.toDate)
      );
    if (filters.createdFrom)
      filtered = filtered.filter(
        (b) => new Date(b.createdAt) >= new Date(filters.createdFrom)
      );
    if (filters.createdTo)
      filtered = filtered.filter(
        (b) => new Date(b.createdAt) <= new Date(filters.createdTo)
      );

    // Boolean presence filters
    if (filters.shortDescription !== "all") {
      filtered = filtered.filter((b) =>
        filters.shortDescription === "yes" ? !!b.description : !b.description
      );
    }
    if (filters.detailsDescription !== "all") {
      filtered = filtered.filter((b) =>
        filters.detailsDescription === "yes"
          ? !!b.detailDescription
          : !b.detailDescription
      );
    }
    if (filters.website !== "all") {
      filtered = filtered.filter((b) =>
        filters.website === "yes" ? !!b.website : !b.website
      );
    }
    if (filters.facebook !== "all") {
      filtered = filtered.filter((b) =>
        filters.facebook === "yes"
          ? !!b.socialLinks?.facebook
          : !b.socialLinks?.facebook
      );
    }
    if (filters.instagram !== "all") {
      filtered = filtered.filter((b) =>
        filters.instagram === "yes"
          ? !!b.socialLinks?.instagram
          : !b.socialLinks?.instagram
      );
    }
    if (filters.address !== "all") {
      filtered = filtered.filter((b) =>
        filters.address === "yes" ? !!b.address : !b.address
      );
    }

    // Promotion Image presence filter
    if (filters.promotionImg !== "all") {
      filtered = filtered.filter((b) =>
        filters.promotionImg === "yes" ? !!b.coverImage : !b.coverImage
      );
    }

    // Guest filter (maxGuest > 0 or not)
    if (filters.guest !== "all") {
      filtered = filtered.filter((b) =>
        filters.guest === "yes"
          ? b.maxGuest && b.maxGuest > 0
          : !b.maxGuest || b.maxGuest === 0
      );
    }

    // Provider Type filter
    if (filters.providerType !== "all") {
      filtered = filtered.filter(
        (b) =>
          b.providerType?.name?.toLowerCase() ===
          filters.providerType.toLowerCase()
      );
    }

    // Search text filter (name, address, providerType.name)
    if (searchText.trim() !== "") {
      const lowerSearch = searchText.trim().toLowerCase();
      filtered = filtered.filter((b) => {
        const name = b.name?.trim()?.toLowerCase() || "";
        const address = b.address?.trim()?.toLowerCase() || "";
        const providerType = b.providerType?.name?.trim()?.toLowerCase() || "";

        return (
          name.includes(lowerSearch) ||
          address.includes(lowerSearch) ||
          providerType.includes(lowerSearch)
        );
      });
    }

    // Sorting by times
    if (filters.startTimeSort !== "all") {
      filtered = sortByString(
        filtered,
        (b) => b.availabilities?.startTime ?? "",
        filters.startTimeSort
      );
    }
    if (filters.endTimeSort !== "all") {
      filtered = sortByString(
        filtered,
        (b) => b.availabilities?.endTime ?? "",
        filters.endTimeSort
      );
    }

    // Price Range sorting (string sort)
    if (filters.priceRangeSort !== "all") {
      filtered = sortByString(
        filtered,
        (b) => b.priceRange ?? "",
        filters.priceRangeSort
      );
    }

    // Followers (using totalLikes as proxy)
    if (filters.followersSort !== "all") {
      filtered = sortByNumber(
        filtered,
        (b) => b.totalLikes ?? 0,
        filters.followersSort
      );
    }

    // Likes sorting
    if (filters.likesSort !== "all") {
      filtered = sortByNumber(
        filtered,
        (b) => b.totalLikes ?? 0,
        filters.likesSort
      );
    }

    // Comments sorting
    if (filters.commentsSort !== "all") {
      filtered = sortByNumber(
        filtered,
        (b) => b.totalComments ?? 0,
        filters.commentsSort
      );
    }

    // Rating sorting
    if (filters.ratingSort !== "all") {
      filtered = sortByNumber(
        filtered,
        (b) => b.averageRating ?? 0,
        filters.ratingSort
      );
    }

    return filtered;
  }, [businessListingData, filters, searchText]);

  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Business Profile
            </p>
          </div>
        </div>

        {/* Filter Section */}
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
                />
              </div>

              {/* Boolean presence filters */}
              {[
                { label: "Short Description", key: "shortDescription" },
                { label: "Details Description", key: "detailsDescription" },
                { label: "Website", key: "website" },
                { label: "Facebook", key: "facebook" },
                { label: "Instagram", key: "instagram" },
                { label: "Address", key: "address" },
                { label: "Promotion Img", key: "promotionImg" },
                { label: "Guest", key: "guest" },
              ].map(({ label, key }) => (
                <div className="flex flex-col items-start gap-1" key={key}>
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    {label}
                  </Typography.Text>
                  <Select
                    value={filters[key]}
                    onChange={(val) => handleFilterChange(key, val)}
                    style={{ width: 150 }}
                    className="!h-10"
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="yes">Yes</Select.Option>
                    <Select.Option value="no">No</Select.Option>
                  </Select>
                </div>
              ))}

              {/* Provider Type dropdown */}
              <div className="flex flex-col items-start gap-1">
                <Typography.Text className="text-lg text-base-color font-semibold">
                  Provider Type
                </Typography.Text>
                <Select
                  value={filters.providerType}
                  onChange={(val) => handleFilterChange("providerType", val)}
                  style={{ width: 150 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  {[
                    ...new Set(
                      businessListingData.map((b) => b.providerType?.name)
                    ),
                  ]
                    .filter(Boolean)
                    .map((type) => (
                      <Select.Option key={type} value={type.toLowerCase()}>
                        {type}
                      </Select.Option>
                    ))}
                </Select>
              </div>

              {/* Sorting dropdowns */}
              {[
                { label: "Start Time", key: "startTimeSort" },
                { label: "End Time", key: "endTimeSort" },
                { label: "Price Range", key: "priceRangeSort" },
                { label: "Followers", key: "followersSort" },
                { label: "Like", key: "likesSort" },
                { label: "Comments", key: "commentsSort" },
                { label: "Rating", key: "ratingSort" },
              ].map(({ label, key }) => (
                <div className="flex flex-col items-start gap-1" key={key}>
                  <Typography.Text className="text-lg text-base-color font-semibold">
                    {label}
                  </Typography.Text>
                  <Select
                    value={filters[key]}
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
        <div className="flex items-center justify-between mb-7">
          {/* Replaced your SearchInput with simple input for demo */}
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

        {/* Table */}
        <AdminBusinessListingTable
          loading={isFetching}
          data={filteredData.slice((page - 1) * limit, page * limit)}
          page={page}
          limit={limit}
          total={filteredData.length}
          setPage={setPage}
          setSelectedData={setSelectedData}
          showViewUserModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
        />
      </div>

      {/* Modals */}
      <BusinessUserModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        data={currentRecord}
      />
      <AdminBusinessListingDeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        data={currentRecord}
      />
    </div>
  );
};

export default AdminBusinessListing;
