import { useState } from "react";
import userData from "../../../public/data/Users";
import AllUserTable from "../../Components/UI/Tables/UserTable";
import UserModal from "../../Components/UI/Modal/User/UserModal";
import UserBlockModal from "../../Components/UI/Modal/User/UserBlockModal";
import UserUnblockModal from "../../Components/UI/Modal/User/UserUnblockModal";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const AdminAllUsers = () => {
  const user = userData;
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

  const showViewUserModal = (record) => {
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
      <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-5 text-gradient-color font-semibold">
        User List
      </p>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-end">
            <div className="flex gap-4 items-center">
              <ConfigProvider
                theme={{ token: { colorTextPlaceholder: "#6A0DAD " } }}
              >
                <Input
                  placeholder="Search User..."
                  onChange={handleSearch}
                  className="text-secondary-color font-semibold !border-secondary-color !bg-transparent py-2 !rounded-full"
                  prefix={
                    <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                  }
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
        <AllUserTable
          data={user}
          loading={false}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={user.length}
          limit={limit}
        />
        <UserModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <UserBlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <UserUnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminAllUsers;
