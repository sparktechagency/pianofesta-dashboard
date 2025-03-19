/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";

const UserUnblockModal = ({
  isUnblockModalVisible,
  handleCancel,
  currentRecord,
}) => {
  //   const [unBlockUser] = useUnblockUserMutation();
  const handleUserUnBlock = async (data) => {
    console.log(data);
    // const toastId = toast.loading("Unblocking User...");
    // try {
    //   const res = await unBlockUser({ id: data?._id }).unwrap();
    //   if (res?.status === "success") {
    //     toast.success(res.message, {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error?.data?.message, {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }
    // handleCancel();
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={isUnblockModalVisible}
      onOk={handleUserUnBlock}
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
            style={{ background: "#333333" }}
            onClick={() => handleUserUnBlock(currentRecord)}
          >
            Unblock
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to unblock this user?
      </p>
    </Modal>
  );
};

export default UserUnblockModal;
