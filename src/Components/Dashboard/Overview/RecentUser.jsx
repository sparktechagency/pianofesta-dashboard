import { useState } from "react";
import UserModal from "../../UI/Modal/User/UserModal";
import AllUserTable from "../../UI/Tables/UserTable";
import userData from "../../../../public/data/Users";
import UserBlockModal from "../../UI/Modal/User/UserBlockModal";
import UserUnblockModal from "../../UI/Modal/User/UserUnblockModal";
const RecentUser = () => {
  const recentUserData = userData.slice(0, 6);

  const [isRecentUserViewModalVisible, setIsRecentUserViewModalVisible] =
    useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsRecentUserViewModalVisible(true);
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
    setIsRecentUserViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div
      className="mt-10 bg-primary-color rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between items-center mx-3 py-2">
        <p className="text-2xl text-gradient-color lg:text-3xl font-bold mb-5">
          Recent Users
        </p>
      </div>

      <AllUserTable
        data={recentUserData}
        loading={false}
        showViewModal={showViewUserModal}
        showBlockModal={showBlockModal}
        showUnblockModal={showUnblockModal}
      />
      <UserModal
        isUserViewModalVisible={isRecentUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        showFilters={false}
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
  );
};

export default RecentUser;
