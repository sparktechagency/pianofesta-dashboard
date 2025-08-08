import { SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input } from "antd";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import AddSponsorManagementModal from "../../Components/UI/Modal/Sponsor/AddSponsorModal";
import SponseManagementTable from "../../Components/UI/Tables/SponserManagementTable";
import UpdateSponsorManagementModal from "../../Components/UI/Modal/Sponsor/UpdateSponsorModal";
import { useGetSponsorManagementQuery } from "../../redux/features/sponsorManagement/sponsorManagementApi";
import DeleteSponsorModal from "../../Components/UI/Modal/Sponsor/DeleteSponsorModal";

const AdminSponsorManagement = () => {
  const [activeTab, setActiveTab] = useState("event");
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetSponsorManagementQuery(
    {
      type: activeTab,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !activeTab,
    }
  );

  const sponsorData = data?.data;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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
    setSearchText(""); // Reset searchText whenever activeTab changes
    setSearchValue(""); // Reset searchValue whenever activeTab changes
  }, [activeTab]);

  const showEditModal = (record) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 bg-gradient rounded-lg p-3">
          <p
            onClick={() => setActiveTab("event")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "event"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Event
          </p>
          <p
            onClick={() => setActiveTab("business")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "business"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Business
          </p>
          <p
            onClick={() => setActiveTab("job")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "job"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Job
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="text-base lg:text-lg !p-4 !bg-secondary-color !text-primary-color border !border-secondary-color !rounded flex items-center gap-2"
        >
          <MdAdd className="text-base lg:text-lg text-primary-color" />
          Add New Pacakge
        </Button>
      </div>

      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 2px 1px #00000020" }}
      >
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gradient-color font-semibold">
              {activeTab === "event"
                ? "Event"
                : activeTab === "business"
                ? "Business"
                : "Job"}
            </p>
            <div className="flex gap-4 items-center">
              <ConfigProvider
                theme={{ token: { colorTextPlaceholder: "#6A0DAD " } }}
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

        <AddSponsorManagementModal
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
        />

        <SponseManagementTable
          data={sponsorData}
          loading={isFetching}
          showEditModal={showEditModal}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={sponsorData?.length}
          limit={limit}
        />

        <UpdateSponsorManagementModal
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <DeleteSponsorModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminSponsorManagement;
