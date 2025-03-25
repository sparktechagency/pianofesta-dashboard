import { useState } from "react";
import AdminBusinessListingDeleteModal from "../../../Components/UI/Modal/AdminListingModal/AdminBusinessListingDeleteModal";
import BusinessUserModal from "../../../Components/UI/Modal/BusinessUser/BusinessUserModal";

import AdminBusinessListingTable from "../../../Components/UI/Tables/AdminListing/AdminBusinessListingTable";
import businessListingData from "../../../../public/data/businessListingData";

const AdminBusinessListing = () => {
  const data = businessListingData;
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

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
  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Business Profile
            </p>
          </div>
        </div>
        <AdminBusinessListingTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
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
        <AdminBusinessListingDeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminBusinessListing;
