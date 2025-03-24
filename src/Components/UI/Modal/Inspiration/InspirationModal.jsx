/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";

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
      className="lg:!w-[450px]"
    >
      <div className="mt-7">
        <div className="">
          <div className="flex justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.coverPhoto}
              alt="cover"
              className="w-full h-40 object-cover rounded"
            />
          </div>

          <div className="mt-2">
            <div className="text-lg  ">
              <div className=" my-2">
                <span className="font-bold">{currentRecord?.postTitle}</span>
              </div>

              <div className="text-base">
                <span>{currentRecord?.description}</span>
              </div>

              <Button
                className="mt-5 !bg-error-color !text-primary-color !border-error-color block mx-auto"
                type="primary"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InspirationModal;
