/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";
import dayjs from "dayjs";

const AdminListingModal = ({
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
      <div className="p-5">
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.coverPhoto}
              alt={currentRecord?.name}
              className="w-full h-40 object-cover rounded"
            />
            <div className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.eventName}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Date: </span>
                <span className="">
                  {dayjs(new Date()).format("DD-MM-YYYY")}
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Location:</span>
                <span>{currentRecord?.location}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Organized By:</span>
                <span>{currentRecord?.organizer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminListingModal;
