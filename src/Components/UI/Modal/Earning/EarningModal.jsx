/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";

const EarningModal = ({ isViewModalVisible, handleCancel, currentRecord }) => {
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
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            Earning Details
          </h3>
          <div className="flex justify-start items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.user}
              alt={currentRecord?.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.name}
            </div>
          </div>
          <p className="lg:text-lg font-bold text-secondary-color text-start mt-5">
            Information
          </p>
          <div className="mt-2">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">UID: </span>
                <span className="">{currentRecord?.uid}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Transaction ID:</span>
                <span>0123456789</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Time & Date:</span>
                <span>4:15 PM, 13/02/24</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Amount:</span>
                <span>{currentRecord?.amount}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Payment Method: </span>
                <span className="text-justify pt-0 ">Debit Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EarningModal;
