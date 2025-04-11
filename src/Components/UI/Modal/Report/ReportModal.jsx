import { Modal, Rate } from "antd";
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
      <div className="p-5">
        <div className="">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl mb-3 text-secondary-color">
              Users Details
            </h3>
            <p className="text-[#989898] sm:text-lg lg:text-xl ">
              See full Report Details from {currentRecord?.fullName}
            </p>
          </div>
          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={AllImages.user}
              alt={currentRecord?.Name}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <h1 className="text-lg sm:text-xl lg:text-2xl text-secondary-color">
              {currentRecord?.fullName}
            </h1>
          </div>

          <div className="mt-2 w-[90%] sm:w-[80%] lg:w-[70%] mx-auto">
            <p className="text-base-color text-xl sm:text-2xl lg:text-3xl mb-5">
              User Information :
            </p>
            <div className="text-lg start">
              <div className="flex   items-center gap-2 mb-2">
                <div className="font-semibold">Name: </div>
                <div className="">{currentRecord?.reportedBy}</div>
              </div>
            </div>

            <div className="text-lg start">
              <div className="flex   items-center gap-2 mb-2">
                <div className="font-semibold">Date: </div>
                <div className="">{currentRecord?.date}</div>
              </div>
            </div>

            <div className="text-lg start">
              <div className="flex   items-center gap-2 mb-2">
                <div className="font-semibold">Rating: </div>
                <div className="">
                  <Rate disabled defaultValue={currentRecord?.rating} />
                </div>
                <div className=""></div>
              </div>
            </div>

            <div className="text-lg start">
              <div className="flex gap-2 mb-2">
                <div className="font-semibold">Review: </div>
                <div className="">{currentRecord?.postTitle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
