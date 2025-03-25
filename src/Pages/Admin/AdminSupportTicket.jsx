import { useState } from "react";
import AdminSupportTicketTable from "../../Components/UI/Tables/AdminSupportTicketTable";
import SearchInput from "../../utils/SearchInput";
import AdminSupportTicketModal from "../../Components/UI/Modal/AdminSupportTicket/AdminSupportTicketModal";
import ticketData from "../../../public/data/supportTicket";

const AdminSupportTicket = () => {
  const data = ticketData;
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

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
              Support
            </p>
            <SearchInput
              placeholder="Search ..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>
        <AdminSupportTicketTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <AdminSupportTicketModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminSupportTicket;
