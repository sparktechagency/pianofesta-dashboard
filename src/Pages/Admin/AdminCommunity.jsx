import { useState } from "react";
import SearchInput from "../../utils/SearchInput";
import InspirationModal from "../../Components/UI/Modal/Inspiration/InspirationModal";
import CommunityTable from "../../Components/UI/Tables/CommunityTable";
import DeleteCommunityModal from "../../Components/UI/Modal/Community/DeleteCommunityModal";
import CommunityData from "../../../public/data/communityTable";

const AdminCommunity = () => {
  const data = CommunityData;
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div className="mt-10">
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 2px 1px #00000020" }}
      >
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gradient-color font-semibold">
              Community
            </p>
            <SearchInput
              placeholder="Search ..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>

        <CommunityTable
          data={data}
          loading={false}
          showViewModal={showViewModal}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />

        <InspirationModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <DeleteCommunityModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminCommunity;
