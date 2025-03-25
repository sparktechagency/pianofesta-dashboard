import { useState } from "react";
import promotionData from "../../../public/data/promotionData";
import { Modal } from "antd";
import PromotionDeleteModal from "../../Components/UI/Modal/Promotion/PromotionModal";
import PromotionTable from "../../Components/UI/Tables/PromotionTable";

const AdminPromotion = () => {
  const data = promotionData;
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
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
        console.log(record);
        // const toastId = toast.loading("Unblocking user...");
        // try {
        //   const res = await unBlockUser({ id: currentRecord?._id }).unwrap();
        //   toast.success(res?.message, { id: toastId, duration: 2000 });
        //   handleCancel();
        // } catch (error) {
        //   toast.error(
        //     error?.data?.message || error?.message || "Failed to ban user",
        //     { id: toastId, duration: 2000 }
        //   );
        // }
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
        console.log(record);
        // const toastId = toast.loading("Unblocking user...");
        // try {
        //   const res = await unBlockUser({ id: currentRecord?._id }).unwrap();
        //   toast.success(res?.message, { id: toastId, duration: 2000 });
        //   handleCancel();
        // } catch (error) {
        //   toast.error(
        //     error?.data?.message || error?.message || "Failed to ban user",
        //     { id: toastId, duration: 2000 }
        //   );
        // }
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
          </div>
        </div>
        <PromotionTable
          data={data}
          loading={false}
          showDeleteModal={showDeleteModal}
          handleEnable={handleEnable}
          handleDisable={handleDisable}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <PromotionDeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminPromotion;
