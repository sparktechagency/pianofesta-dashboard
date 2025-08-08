/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { toast } from "sonner";
import { useDeleteSponsorManagementMutation } from "../../../../redux/features/sponsorManagement/sponsorManagementApi";

const DeleteSponsorModal = ({
  isDeleteModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [deleteSponsor] = useDeleteSponsorManagementMutation();
  const handleDelete = async (data) => {
    const toastId = toast.loading("Deleting Sponsor...");
    try {
      const res = await deleteSponsor({ id: data?._id }).unwrap();
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
    handleCancel();
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalVisible}
      onOk={handleDelete}
      onCancel={handleCancel}
      okText="block"
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
            onClick={handleCancel}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#F5382C" }}
            onClick={() => handleDelete(currentRecord)}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to delete this sponsor?
      </p>
    </Modal>
  );
};

export default DeleteSponsorModal;
