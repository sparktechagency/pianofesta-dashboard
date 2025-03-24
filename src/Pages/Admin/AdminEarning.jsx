import { useState } from "react";
import earningData from "../../../public/data/earningData";
import EarningTable from "../../Components/UI/Tables/EarningTable";
import EarningModal from "../../Components/UI/Modal/Earning/EarningModal";

const AdminEarning = () => {
  const data = earningData;
  const [page, setPage] = useState(1);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
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
              Earnings
            </p>
          </div>
        </div>
        <EarningTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <EarningModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminEarning;
