import { SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input } from "antd";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import AddCategoryModal from "../../Components/UI/Modal/Category/AddCategoryModal";
import CategoryTable from "../../Components/UI/Tables/CategoryTable";
import DeleteCategoryModal from "../../Components/UI/Modal/Category/DeleteCategoryModal";
import { useSubCategoryQuery } from "../../redux/features/categories/categoriesApi";
import EditCategoryModal from "../../Components/UI/Modal/Category/EditCategoryModal";

const tabOptions = [
  { key: "Event", label: "Event" },
  { key: "Provider", label: "Provider" },
  { key: "job", label: "Job" },
  { key: "sopportedServices", label: "Supported Services" },
  { key: "extraServices", label: "Extra Services" },
  { key: "inspiration", label: "Inspiration" },
  { key: "community", label: "Community" },
];

const AdminCategory = () => {
  const [activeTab, setActiveTab] = useState("Event");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const [searchValue, setSearchValue] = useState("");

  const limit = 12;

  const { data, isFetching } = useSubCategoryQuery(
    {
      type: activeTab,
      page,
      limit,
      searchTerm: searchValue,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const categoryData = data?.data?.data;
  const totalCategoryData = data?.data?.meta?.total;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((value) => {
    setPage(1);
    setSearchText(value);
  }, 500);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  useEffect(() => {
    setSearchText("");
    setSearchValue("");
  }, [activeTab]);

  const showEditModal = (record) => {
    setCurrentRecord(record);
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center flex-wrap gap-y-2">
        <div className="flex items-center gap-2 bg-gradient rounded-lg p-3 flex-wrap">
          {tabOptions.map((tab) => (
            <p
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1 ${
                activeTab === tab.key
                  ? "border-b-2 border-secondary-color text-secondary-color"
                  : "text-[#717375] border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </p>
          ))}
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="text-base lg:text-lg !p-4 !bg-secondary-color !text-primary-color border !border-secondary-color !rounded flex items-center gap-2"
        >
          <MdAdd className="text-base lg:text-lg text-primary-color" />
          Add New Subcategory
        </Button>
      </div>

      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 2px 1px #00000020" }}
      >
        <div className="bg-primary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between my-5 flex-wrap gap-y-2">
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gradient-color font-semibold">
              {tabOptions.find((tab) => tab.key === activeTab)?.label ||
                "Category"}
            </p>
            <div className="flex gap-4 items-center">
              <ConfigProvider
                theme={{ token: { colorTextPlaceholder: "#6A0DAD" } }}
              >
                <Input
                  placeholder="Search..."
                  onChange={handleSearch}
                  value={searchValue}
                  className="text-secondary-color font-semibold !border-secondary-color !bg-transparent py-2 !rounded-xl"
                  prefix={
                    <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                  }
                />
              </ConfigProvider>
            </div>
          </div>
        </div>

        {isAddModalOpen && (
          <AddCategoryModal
            activeTab={activeTab}
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
          />
        )}

        <EditCategoryModal
          activeTab={activeTab}
          isEditModalOpen={isEditModalOpen}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <CategoryTable
          activeTab={activeTab}
          data={categoryData}
          loading={isFetching}
          showEditModal={showEditModal}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={totalCategoryData}
          limit={limit}
        />

        <DeleteCategoryModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminCategory;
