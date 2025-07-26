import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Select, Typography } from "antd";
import { useState, useMemo } from "react";
import RequestCategoryTable from "../../Components/UI/Tables/RequestCategoryTable";
import { FaFilter } from "react-icons/fa";
import { useRequestedCategoryQuery } from "../../redux/features/categories/categoriesApi";

const tabOptions = [
  { key: "Event", label: "Event" },
  { key: "Provider", label: "Provider" },
  { key: "job", label: "Job" },
  { key: "sopportedServices", label: "Supported Services" },
  { key: "extraServices", label: "Extra Services" },
  { key: "inspiration", label: "Inspiration" },
  { key: "community", label: "Community" },
];

const AdminRequestedCategory = () => {
  const { data, isFeatching } = useRequestedCategoryQuery();
  const reqCategories = data?.data || [];

  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const limit = 12;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debounceSearch(e.target.value);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setPage(1);
  };

  const debounceSearch = debounce((value) => {
    setPage(1);
    setSearchText(value.trim().toLowerCase());
  }, 500);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const filteredData = useMemo(() => {
    return reqCategories.filter((item) => {
      const matchesType =
        selectedType === "all" ||
        item.type?.toLowerCase() === selectedType.toLowerCase();

      const matchesSearch =
        item?.name?.toLowerCase().includes(searchText) ||
        item?.user?.name?.toLowerCase().includes(searchText);

      return matchesType && matchesSearch;
    });
  }, [reqCategories, selectedType, searchText]);

  return (
    <div className="mt-10">
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 2px 1px #00000020" }}
      >
        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gradient-color font-semibold mt-10">
          Requested Categories
        </p>

        {/* Filter */}
        <div className="flex justify-between items-start gap-4 my-8">
          <div
            className={`${
              showFilter ? "flex" : "hidden"
            } flex items-center justify-start flex-wrap gap-4`}
          >
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
                  Type
                </Typography.Text>
                <Select
                  value={selectedType}
                  onChange={handleTypeChange}
                  style={{ width: 200 }}
                  className="!h-10"
                >
                  <Select.Option value="all">All</Select.Option>
                  {tabOptions.map((option) => (
                    <Select.Option key={option.key} value={option.key}>
                      {option.label}
                    </Select.Option>
                  ))}
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
              className="text-2xl text-secondary-color cursor-pointer"
              title="Toggle Filters"
            />
          </div>
        </div>

        {/* Search */}
        <div className="bg-primary-color w-full rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between my-5">
            <div className="flex gap-4 items-center w-full max-w-md">
              <ConfigProvider
                theme={{ token: { colorTextPlaceholder: "#6A0DAD" } }}
              >
                <Input
                  placeholder="Search by category or requester..."
                  onChange={handleSearch}
                  value={searchValue}
                  className="text-secondary-color font-semibold !border-secondary-color !bg-transparent py-2 !rounded-xl"
                  prefix={
                    <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                  }
                  allowClear
                />
              </ConfigProvider>
            </div>
          </div>
        </div>

        <RequestCategoryTable
          data={filteredData}
          loading={isFeatching}
          setPage={setPage}
          page={page}
          total={filteredData.length}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AdminRequestedCategory;
