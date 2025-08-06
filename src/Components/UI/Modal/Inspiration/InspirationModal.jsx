/* eslint-disable react/prop-types */
import { Modal } from "antd";

const InspirationModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[700px]"
    >
      <div className="mt-5">
        {/* Cover Image */}
        {currentRecord?.coverImage && (
          <img
            src={currentRecord.coverImage}
            alt="cover"
            className="w-full h-48 object-cover rounded"
          />
        )}

        {/* Blog Info */}
        <div className="mt-4 space-y-3">
          <h2 className="text-2xl font-bold text-secondary-color">
            {currentRecord?.title}
          </h2>

          <div className="text-sm text-gray-600">
            <span className="font-medium">Category:</span>{" "}
            {currentRecord?.category?.name || "N/A"}
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">Posted by:</span>{" "}
            {currentRecord?.author?.name || "Unknown"}{" "}
            {currentRecord?.author?.role === "admin" && "(Admin)"}
          </div>

          <div className="text-base text-gray-700 whitespace-pre-line">
            {currentRecord?.description}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InspirationModal;
