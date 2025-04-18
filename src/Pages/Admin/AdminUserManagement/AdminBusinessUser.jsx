import { useState } from "react";
import businessData from "../../../../public/data/BusinessData";
import BusinessUserModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserModal";
import BusinessUserBlockModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserBlockModal";
import BusinessUserUnblockModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserUnblockModal";
import AllBusinessUserTable from "../../../Components/UI/Tables/BusinessUserTable";
import SearchInput from "../../../utils/SearchInput";

const AdminBusinessUser = () => {
  const data = businessData;
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

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
              Business User List
            </p>
            <SearchInput
              placeholder="Search ..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>
        <AllBusinessUserTable
          data={data}
          loading={false}
          showViewModal={showViewModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={data.length}
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
