import { useState } from "react";
import AddAdminTable from "../../../Components/UI/Tables/AddAdminTable";
import AddAdminViewModal from "../../../Components/UI/Modal/AddAdmin/AddAdminViewModal";
import { Button } from "antd";
import { MdAdd } from "react-icons/md";
import AddAdminModal from "../../../Components/UI/Modal/AddAdmin/AddAdminModal";

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "i2P7o@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "John Doe",
    email: "i2P7o@example.com",
    role: "Admin",
  },
];

const AddAdmin = () => {
  const data = userData;
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
              Admin List
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="text-base lg:text-lg !p-4 !bg-secondary-color !text-primary-color border !border-secondary-color !rounded flex items-center gap-2"
            >
              <MdAdd className="text-base lg:text-lg text-primary-color" />
              Add Admin
            </Button>
          </div>
        </div>
        <AddAdminTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <AddAdminModal
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
        />
        <AddAdminViewModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AddAdmin;
