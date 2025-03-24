import { Button, Modal } from "antd";
// import { toast } from "sonner";

const DeleteFAQModal = ({
  isFaqDeleteModalOpen,
  handleCancelFaqDeleteModal,
  currentRecord,
}) => {
  // const [deleteFaq] = useDeleteFaqMutation();
  const handleDelete = async () => {
    console.log(currentRecord);
    handleCancelFaqDeleteModal();
    // const toastId = toast.loading("Deleting subscription...");
    // try {
    //   const res = await deleteFaq({ id: currentRecord?._id }).unwrap();

    //   if (res?.success) {
    //     toast.success("FAQ deleted successfully", {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //   }
    //   handleCancelFaqDeleteModal();
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to delete subscription", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={isFaqDeleteModalOpen}
      onOk={handleDelete}
      onCancel={() => handleCancelFaqDeleteModal()}
      okText="Delete"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <Button
            className="text-xl py-5 px-8 !text-base-color"
            type="primary"
            onClick={() => handleCancelFaqDeleteModal()}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
              color: "black",
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#FA4A0D" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to Delete this FAQ?
      </p>
    </Modal>
  );
};

export default DeleteFAQModal;
