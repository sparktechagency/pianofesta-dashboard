/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useDeleteAdminMutation } from "../../../../redux/features/adminManagement/adminManagementApi";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";

const AdminRemoveModal = ({
  isDeleteModalOpen,
  handleCancel,
  currentRecord,
}) => {
  const [deleteAdmin] = useDeleteAdminMutation();
  const handleBlock = async (data) => {
    const res = await tryCatchWrapper(
      deleteAdmin,
      { params: data?._id },
      "Removing Admin..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalOpen}
      onOk={() => handleBlock(currentRecord)}
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
            onClick={() => handleBlock(currentRecord)}
          >
            Remove
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to Remove this Admin?
      </p>
    </Modal>
  );
};

export default AdminRemoveModal;
