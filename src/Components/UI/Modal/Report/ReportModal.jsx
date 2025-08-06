import { Button, Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";

const ReportModal = ({ isViewModalVisible, handleCancel, currentRecord }) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      {" "}
      <div className="py-5">
        <div className="">
          <div className="flex justify-center items-center mt-5">
            {/* Avatar */}
            <img
              src={
                currentRecord?.postId
                  ? currentRecord?.postId?.image
                  : currentRecord?.inspirationId?.coverImage ||
                    AllImages.coverPhoto
              }
              alt={currentRecord?.Name}
              className="w-full h-auto "
            />
            <h1 className="text-lg sm:text-xl lg:text-2xl text-secondary-color">
              {currentRecord?.fullName}
            </h1>
          </div>

          <div className="mt-5 ">
            <div className="text-lg start">
              <div className="flex  flex-col gap-2 mb-2">
                <div className="text-xl font-semibold">
                  {currentRecord?.postId
                    ? currentRecord?.postId?.title
                    : currentRecord?.inspirationId?.title || "N/A"}
                </div>
                <div className="">{currentRecord?.reason}</div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-5">
              <Button className="w-fit !py-5 !px-8 !text-lg !bg-error-color !text-primary-color !border-error-color">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
