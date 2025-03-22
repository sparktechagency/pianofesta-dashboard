import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import businessData from "../../../public/data/BusinessData";
import BusinessUserModal from "../../Components/UI/Modal/BusinessUser/BusinessUserModal";
import BusinessUserBlockModal from "../../Components/UI/Modal/BusinessUser/BusinessUserBlockModal";
import BusinessUserUnblockModal from "../../Components/UI/Modal/BusinessUser/BusinessUserUnblockModal";
import AllBusinessUserTable from "../../Components/UI/Tables/BusinessUserTable";

const AdminBusinessUser = () => {
  const user = businessData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleSearch = (e) => {
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
  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              User List
            </p>
            <div className="flex gap-4 items-center">
              <Input
                placeholder="Search User..."
                onChange={handleSearch}
                className="text-secondary-color font-semibold !border-secondary-color !bg-transparent py-2 !rounded-xl"
                prefix={
                  <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                }
              />
            </div>
          </div>
        </div>
        <AllBusinessUserTable
          data={user}
          loading={false}
          showViewModal={showViewModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={user.length}
          limit={limit}
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
