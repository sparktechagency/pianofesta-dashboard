import { Button } from "antd";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import SearchInput from "../../utils/SearchInput";
import AddInspirationModal from "../../Components/ui/Modal/Inspiration/AddInspirationModal";
import InspirationTable from "../../Components/ui/Tables/InspirationTable";
import InspirationModal from "../../Components/ui/Modal/Inspiration/InspirationModal";
import DeleteInspirationModal from "../../Components/ui/Modal/Inspiration/DeleteInspirationModal";
import EditInspirationModal from "../../Components/ui/Modal/Inspiration/EditInspirationModal";
import { useGetInspirationQuery } from "../../redux/features/inspiration/inspirationAPi";

const AdminInspiration = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const limit = 12;
  const { data, isFetching } = useGetInspirationQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const inspirationData = data?.data?.data;
  const totalInspiration = data?.data?.meta?.total;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    setIsEditModalOpen(true);
  };
  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalVisible(false);
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div className="mt-10">
      <div className="flex justify-end items-center">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="text-base lg:text-lg !p-4 !bg-secondary-color !text-primary-color border !border-secondary-color !rounded flex items-center gap-2"
        >
          <MdAdd className="text-base lg:text-lg text-primary-color" />
          Post New Inspiration
        </Button>
      </div>

      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 2px 1px #00000020" }}
      >
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gradient-color font-semibold">
              Inspirations
            </p>
            <SearchInput
              placeholder="Search ..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>

        <InspirationTable
          data={inspirationData}
          loading={isFetching}
          showViewModal={showViewModal}
          showEditModal={showEditModal}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={totalInspiration}
          limit={limit}
        />

        <AddInspirationModal
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
        />

        <EditInspirationModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          currentRecord={currentRecord}
        />

        <InspirationModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <DeleteInspirationModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminInspiration;
