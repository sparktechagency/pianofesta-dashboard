import { useState } from "react";
import { Button, Modal } from "antd";
import PromotionDeleteModal from "../../Components/ui/Modal/Promotion/PromotionModal";
import PromotionTable from "../../Components/ui/Tables/PromotionTable";
import { MdAdd } from "react-icons/md";
import AddPromotionModal from "../../Components/ui/Modal/Promotion/AddPromotionModal";
import {
  useGetPromotionsQuery,
  useTogglePromotionsActiveMutation,
} from "../../redux/features/promotions/promotionsApi";
import { toast } from "sonner";
import EditPromotionModal from "../../Components/ui/Modal/Promotion/EditPromotionModal";

const AdminPromotion = () => {
  const { data, isFetching } = useGetPromotionsQuery();
  const [togglePromotionsActive] = useTogglePromotionsActiveMutation();
  const promotionsData = data?.data;
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const limit = 12;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

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
    setCurrentRecord(null);
  };

  const handleEnable = async (record) => {
    Modal.confirm({
      title: "Are you sure you want to enable this promotion?",
      okText: "Yes, Enable",
      cancelText: "Cancel",
      okButtonProps: {
        style: {
          backgroundColor: "#00C566",
          borderColor: "#00C566",
          color: "white",
        },
      },
      onOk: async () => {
        const toastId = toast.loading("Enabling promotion...");
        try {
          const res = await togglePromotionsActive({
            id: record?._id,
          }).unwrap();
          toast.success(res?.message, { id: toastId, duration: 2000 });
          handleCancel();
        } catch (error) {
          toast.error(
            error?.data?.message ||
              error?.message ||
              "Failed to enable promotion",
            { id: toastId, duration: 2000 }
          );
        }
      },
    });
  };
  const handleDisable = async (record) => {
    Modal.confirm({
      title: "Are you sure you want to disable this promotion?",
      okText: "Yes, Disable",
      cancelText: "Cancel",
      okButtonProps: {
        style: {
          backgroundColor: "#E53935",
          borderColor: "#E53935",
          color: "white",
        },
      },
      onOk: async () => {
        const toastId = toast.loading("Disabling promotion...");
        try {
          const res = await togglePromotionsActive({
            id: record?._id,
          }).unwrap();
          toast.success(res?.message, { id: toastId, duration: 2000 });
          handleCancel();
        } catch (error) {
          toast.error(
            error?.data?.message ||
              error?.message ||
              "Failed to disable promotion",
            { id: toastId, duration: 2000 }
          );
        }
      },
    });
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
              Promotions
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="text-base lg:text-lg !p-4 !bg-secondary-color !text-primary-color border !border-secondary-color !rounded flex items-center gap-2"
            >
              <MdAdd className="text-base lg:text-lg text-primary-color" />
              Create New Coupon
            </Button>
          </div>
        </div>
        <PromotionTable
          data={promotionsData}
          loading={isFetching}
          showDeleteModal={showDeleteModal}
          showEditModal={showEditModal}
          handleEnable={handleEnable}
          handleDisable={handleDisable}
          setPage={setPage}
          page={page}
          total={promotionsData?.length}
          limit={limit}
        />
        <PromotionDeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <EditPromotionModal
          isEditModalOpen={isEditModalOpen}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <AddPromotionModal
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
        />
      </div>
    </div>
  );
};

export default AdminPromotion;
