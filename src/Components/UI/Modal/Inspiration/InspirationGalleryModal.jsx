/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Image, Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";

const InspirationGalleryModal = ({
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
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Image
          src={AllImages.coverPhoto}
          alt="cover"
          className="w-full !h-80 object-cover "
        />
        <Image
          src={AllImages.coverPhoto}
          alt="cover"
          className="w-full !h-80 object-cover "
        />
        <Image
          src={AllImages.coverPhoto}
          alt="cover"
          className="w-full !h-80 object-cover "
        />
        <Image
          src={AllImages.coverPhoto}
          alt="cover"
          className="w-full !h-80 object-cover "
        />
      </div>
    </Modal>
  );
};

export default InspirationGalleryModal;
