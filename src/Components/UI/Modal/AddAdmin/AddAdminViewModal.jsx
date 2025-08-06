import { Button, Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";
import { formetDateAndTime } from "../../../../utils/dateFormet";

const AddAdminViewModal = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
  showDeleteModal,
}) => {
  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            Admin Details
          </h3>

          <div className="flex justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={currentRecord?.profileImage || AllImages.dummyProfile}
              alt={currentRecord?.name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.name}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="">{currentRecord?.name}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>

              <div className="flex items-center  gap-2 mb-5">
                <span className="font-medium">Joining Date :</span>
                <span className="text-justify pt-0 ">
                  {formetDateAndTime(currentRecord?.createdAt)}
                </span>
              </div>

              <div className="flex justify-center items-center  gap-2">
                <Button
                  onClick={() => showDeleteModal(currentRecord)}
                  className="w-fit py-4  px-8 border !border-error-color hover:border-error-color text-xl !text-primary-color bg-error-color hover:!bg-error-color font-semibold rounded-lg"
                >
                  Remove Admin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAdminViewModal;
