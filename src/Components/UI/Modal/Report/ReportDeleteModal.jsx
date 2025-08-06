import { Button, Modal } from "antd";
import { useDeleteReportMutation } from "../../../../redux/features/report/reportApi";
import tryCatchWrapper from "../../../../utils/TryCatchWraper";

const ReportDeleteModal = ({
  isDeleteModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [deleteReport] = useDeleteReportMutation();
  const handleDelete = async (data) => {
    const res = await tryCatchWrapper(
      deleteReport,
      { params: data?._id },
      "Removing Report..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalVisible}
      onOk={handleDelete}
      onCancel={handleCancel}
      okText="delete"
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
        Do you want to Delete This?
      </p>
    </Modal>
  );
};

export default ReportDeleteModal;
