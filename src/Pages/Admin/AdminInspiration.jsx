import { Button } from "antd";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import SearchInput from "../../utils/SearchInput";
import AddInspirationModal from "../../Components/UI/Modal/Inspiration/AddInspirationModal";
import inspirationData from "../../../public/data/inspirationData";
import InspirationTable from "../../Components/UI/Tables/InspirationTable";
import InspirationModal from "../../Components/UI/Modal/Inspiration/InspirationModal";
import DeleteInspirationModal from "../../Components/UI/Modal/Inspiration/DeleteInspirationModal";
import EditInspirationModal from "../../Components/UI/Modal/Inspiration/EditInspirationModal";
import InspirationGalleryTable from "../../Components/UI/Tables/InspirationGalleryTable";
import AddInspirationGalleryModal from "../../Components/UI/Modal/Inspiration/AddInspirationGalleryModal";
import EditGalleryInspirationModal from "../../Components/UI/Modal/Inspiration/EditInspirationGalleryModal";
import InspirationGalleryModal from "../../Components/UI/Modal/Inspiration/InspirationGalleryModal";

const AdminInspiration = () => {
  const data = inspirationData;

  const [activeTab, setActiveTab] = useState("blog");
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const limit = 12;
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 bg-gradient rounded-lg p-3">
          <p
            onClick={() => setActiveTab("blog")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "blog"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Blog
          </p>
          <p
            onClick={() => setActiveTab("gallery")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "gallery"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Gallery
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="text-base lg:text-lg !p-4 !bg-secondary-color !text-primary-color border !border-secondary-color !rounded flex items-center gap-2"
        >
          <MdAdd className="text-base lg:text-lg text-primary-color" />
          {activeTab === "blog" ? "Post New Blog" : "Post New Gallery"}
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
        {activeTab === "blog" ? (
          <InspirationTable
            data={data}
            loading={false}
            showViewModal={showViewModal}
            showEditModal={showEditModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={data.length}
            limit={limit}
          />
        ) : (
          <InspirationGalleryTable
            data={data}
            loading={false}
            showViewModal={showViewModal}
            showEditModal={showEditModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={data.length}
            limit={limit}
          />
        )}
        {activeTab === "blog" ? (
          <AddInspirationModal
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
          />
        ) : (
          <AddInspirationGalleryModal
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
          />
        )}
        {activeTab === "blog" ? (
          <EditInspirationModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            currentRecord={currentRecord}
          />
        ) : (
          <EditGalleryInspirationModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            currentRecord={currentRecord}
          />
        )}
        {activeTab === "blog" ? (
          <InspirationModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        ) : (
          <InspirationGalleryModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        )}

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
