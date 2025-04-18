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
              src={AllImages.coverPhoto}
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
                  Wedding Budget Calculator: here&apos;s how to calculate
                </div>
                <div className="">
                  Planning a wedding is an exciting journey, but it can also be
                  stressful—especially when it comes to managing your budget.
                  Whether you’re organizing a grand celebration or an intimate
                  gathering, having a clear wedding budget calculator can help
                  you allocate your funds wisely and avoid unnecessary expenses.
                </div>
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
