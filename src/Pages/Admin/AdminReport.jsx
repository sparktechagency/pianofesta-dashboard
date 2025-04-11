import { useState } from "react";
import reportData from "../../../public/data/reportData";
import ReportTable from "../../Components/UI/Tables/ReportData";
import ReportModal from "../../Components/UI/Modal/Report/ReportModal";
import ReportDeleteModal from "../../Components/UI/Modal/Report/ReportDeleteModal";

const AdminReport = () => {
  const data = reportData;
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

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
              Event
            </p>
          </div>
        </div>
        <ReportTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <ReportModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <ReportDeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminReport;
