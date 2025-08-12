import { useMemo, useState } from "react";
import UserModal from "../../ui/Modal/User/UserModal";
import AllUserTable from "../../ui/Tables/UserTable";
import UserBlockModal from "../../ui/Modal/User/UserBlockModal";
import UserUnblockModal from "../../ui/Modal/User/UserUnblockModal";
import { useRegularUserQuery } from "../../../redux/features/userManagement/userManagementApi";
const RecentUser = () => {
  const { data, isFetching } = useRegularUserQuery();
  const regularUsers = useMemo(() => data?.data?.slice(0, 5) || [], [data]);

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
        data={regularUsers}
        loading={isFetching}
        showViewModal={showViewUserModal}
        showBlockModal={showBlockModal}
        showUnblockModal={showUnblockModal}
        page={1}
        limit={5}
        total={regularUsers?.length}
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
